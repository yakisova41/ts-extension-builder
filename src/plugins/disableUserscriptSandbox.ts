import { readFileSync, writeFileSync } from "fs";
import { type Plugin } from "esbuild";

export function disableUserscriptSandbox(): Plugin {
  return {
    name: "disableUserscriptSandbox",
    setup(build) {
      build.onEnd(() => {
        const outFile = build.initialOptions.outfile;

        if (outFile !== undefined) {
          const buildResult = readFileSync(outFile);

          writeFileSync(
            outFile,
            [
              [
                `const scriptString = \`${buildResult
                  .toString()
                  .replaceAll("`", "\\`")
                  .replaceAll("$", "\\$")}\`;`,
                'const script = document.createElement("script");',
                "script.innerHTML = scriptString",
                "unsafeWindow.document.body.appendChild(script)",
              ].join("\n"),
            ].join("\n\n")
          );
        }
      });
    },
  };
}
