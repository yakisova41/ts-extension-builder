import { writeFileSync, readFileSync } from "fs";
import { type Plugin } from "esbuild";
import { type UserScriptHeader } from "../config-type";

export function writeUserscriptHeader(
  userScriptHeader: UserScriptHeader
): Plugin {
  return {
    name: "writeUserscriptHeader",
    setup(build) {
      build.onEnd(() => {
        const outFile = build.initialOptions.outfile;

        if (outFile !== undefined) {
          const buildResult = readFileSync(outFile);

          writeFileSync(
            outFile,
            [createUserScriptHeaderString(userScriptHeader), buildResult].join(
              "\n\n"
            )
          );
        }
      });
    },
  };
}

export function createUserScriptHeaderString(
  userScriptHeader: UserScriptHeader
): string {
  const userscriptHeaders: string[] = [];

  userscriptHeaders.push("// ==UserScript==");
  userScriptHeader.forEach(([key, val]) => {
    userscriptHeaders.push(`// ${key} ${val}`);
  });
  userscriptHeaders.push("// ==/UserScript==");

  return userscriptHeaders.join("\n");
}
