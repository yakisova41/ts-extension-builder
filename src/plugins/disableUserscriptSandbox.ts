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
                `const inject = ()=>{${buildResult.toString()}}`,
                'const script = document.createElement("script");',
                // eslint-disable-next-line no-template-curly-in-string
                "script.innerHTML = `(${inject.toString()})()`",
                "unsafeWindow.document.body.appendChild(script)",
              ].join("\n"),
            ].join("\n\n")
          );
        }
      });
    },
  };
}
