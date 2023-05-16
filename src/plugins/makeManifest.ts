import { writeFileSync } from "fs";
import { type Plugin } from "esbuild";
import { join, dirname } from "path";
import { type JSONSchemaForGoogleChromeExtensionManifestFiles } from "../chrome-manifest-type";

export function makeManifest(
  manifest: JSONSchemaForGoogleChromeExtensionManifestFiles
): Plugin {
  return {
    name: "makeManifest",
    setup(build) {
      build.onEnd(() => {
        const outFile = build.initialOptions.outfile;

        if (outFile !== undefined) {
          writeFileSync(
            join(dirname(outFile), "/manifest.json"),
            JSON.stringify(manifest)
          );
        }
      });
    },
  };
}
