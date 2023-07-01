import { writeFileSync, existsSync, mkdirSync } from "fs";
import { type UserScriptHeader, type DevServer } from "../config-type";
import { join } from "path";
import { createUserScriptHeaderString } from "../plugins/writeUserScriptHeader";

class DevScriptFactory {
  private readonly host: string;
  private readonly port: number;
  private readonly userScriptHeader: UserScriptHeader;

  constructor(host: string, port: number, userScriptHeader: UserScriptHeader) {
    this.host = host;
    this.port = port;
    this.userScriptHeader = userScriptHeader;
  }

  public create(): string {
    const headerString = createUserScriptHeaderString([
      ...this.userScriptHeader,
      ["@grant", "GM.xmlHttpRequest"],
      ["@grant", "unsafeWindow"],
    ]);
    const scriptString = this.createClientScript();

    return `${headerString}\n${scriptString}`;
  }

  private createClientScript(): string {
    function clientScriptFnc(host: string, port: number): void {
      // eslint-disable-next-line prettier/prettier, @typescript-eslint/promise-function-async
      const getText = (): Promise<string> => {
        return new Promise((resolve) => {
          void GM.xmlHttpRequest({
            url: `http://${host}:${port}/script`,
            onload: (e) => {
              resolve(e.responseText);
            },
          });
        });
      };

      void getText().then((nowText) => {
        const scriptEl = document.createElement("script");
        scriptEl.textContent = nowText;
        unsafeWindow.document.body.appendChild(scriptEl);

        setInterval(() => {
          void getText().then((text) => {
            if (nowText !== text) {
              console.log("[ts-extension-builder] hot reload...");
              location.reload();
            }
          });
        }, 1000);
      });
    }

    return `${clientScriptFnc.toString()};\nclientScriptFnc( "${this.host}", ${
      this.port
    });`;
  }
}

export async function createPassCSPDevClient(
  { host, port }: DevServer,
  userScriptHeader: UserScriptHeader
): Promise<void> {
  if (!existsSync(join(__dirname, "../tmp"))) {
    mkdirSync(join(__dirname, "../tmp"));
  }

  const factory = new DevScriptFactory(host, port, userScriptHeader);

  writeFileSync(join(__dirname, "../tmp/client.user.js"), factory.create());
}
