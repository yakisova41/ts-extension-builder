import { writeFileSync } from "fs";
import { type Plugin } from "esbuild";
import { join, dirname } from "path";

export function makeContentScript(): Plugin {
  return {
    name: "makeContentScript",
    setup(build) {
      build.onEnd(() => {
        const outFile = build.initialOptions.outfile;

        if (outFile !== undefined) {
          writeFileSync(
            join(dirname(outFile), "/contentScript.js"),
            [
              "const head = document.head;",
              "const script = document.createElement('script');",
              "script.src = chrome.runtime.getURL('embed.js');",
              "head.appendChild(script);",
            ].join("\n")
          );
        }
      });
    },
  };
}
