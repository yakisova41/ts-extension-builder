import getConfig from "../lib/getConfig";
import buildOptionsFactory from "../lib/buildOptionsFactory";
import { context } from "esbuild";
import { join } from "path";
import { createDevClient } from "src/lib/createDevClient";
import { createPassCSPDevClient } from "src/lib/createPassCSPDevClient";
import { DevServer } from "../lib/devServer";
import createEntry from "src/lib/createEntry";

export default function userScriptDev(minify: boolean): void {
  const workingDir = process.cwd();

  void getConfig().then(
    async ({ userScriptHeader, esBuild, devServer, passCSP }) => {
      /**
       * development build
       */
      if (devServer !== undefined) {
        if (passCSP === true) {
          await createPassCSPDevClient(devServer, userScriptHeader);
        } else {
          await createDevClient(devServer, userScriptHeader);
        }
      }

      const options = buildOptionsFactory(
        {
          minify,
          logLevel: "info",
          define: {
            "process.env.NODE_ENV": "'development'",
          },
          plugins: [
            {
              name: "onend",
              setup(build) {
                build.onEnd(() => {
                  ds.reload();
                });
              },
            },
          ],
          bundle: true,
          format: passCSP === true ? "cjs" : "esm",
          entryPoints: [
            passCSP === true
              ? createEntry(join(workingDir, "src", "index.ts"))
              : join(workingDir, "src", "index.ts"),
          ],
          outfile: join(__dirname, "../tmp/script.js"),
        },
        esBuild,
        {
          createEntry: passCSP === true,
          format: passCSP === true ? "cjs" : "esm",
        }
      );

      const ctx = await context(options);
      const ds = DevServer();

      void ctx.watch().then(() => {
        ds.start();
      });
    }
  );
}
