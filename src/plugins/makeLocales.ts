import { existsSync, mkdirSync, writeFileSync } from "fs";
import { type Plugin } from "esbuild";
import { join, dirname } from "path";
import { type Locales } from "../config-type";

export function makeLocales(locales: Locales): Plugin {
  return {
    name: "makeLocales",
    setup(build) {
      build.onEnd(() => {
        const outFile = build.initialOptions.outfile;

        if (outFile !== undefined) {
          const extensionDir = dirname(outFile);

          if (!existsSync(join(extensionDir, "/_locales"))) {
            mkdirSync(join(extensionDir, "/_locales"));
          }

          Object.keys(locales).forEach((langName) => {
            const langDir = join(extensionDir, "/_locales/" + langName);

            if (!existsSync(langDir)) {
              mkdirSync(langDir);
            }

            writeFileSync(
              join(langDir, "/messages.json"),
              JSON.stringify(locales[langName])
            );
          });
        }
      });
    },
  };
}
