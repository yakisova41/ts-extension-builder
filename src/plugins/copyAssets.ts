import { existsSync } from "fs";
import { copySync } from "fs-extra";
import { type Plugin } from "esbuild";
import { dirname } from "path";

export function copyAssets(assetsDir: string): Plugin {
  return {
    name: "copyAssets",
    setup(build) {
      build.onEnd(() => {
        const outFile = build.initialOptions.outfile;

        if (outFile !== undefined) {
          if (existsSync(assetsDir)) {
            copySync(assetsDir, dirname(outFile) + "/assets");
          }
        }
      });
    },
  };
}
