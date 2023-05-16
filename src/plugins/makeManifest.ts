import { writeFileSync } from "fs";
import { type Plugin } from "esbuild";
import { join, dirname } from "path";
import { type JSONSchemaForGoogleChromeExtensionManifestFiles } from "../chrome-manifest-type";
import { type UserScriptHeader } from "../config-type";

export function makeManifest(
  manifest: JSONSchemaForGoogleChromeExtensionManifestFiles,
  userScriptHeader: UserScriptHeader
): Plugin {
  return {
    name: "makeManifest",
    setup(build) {
      build.onEnd(() => {
        const outFile = build.initialOptions.outfile;

        if (userScriptHeader["@match"] !== undefined) {
          manifest.content_scripts = [
            {
              matches: [userScriptHeader["@match"]],
              js: ["contentScript.js"],
            },
          ];

          manifest.web_accessible_resources = [
            {
              matches: [userScriptHeader["@match"]],
              resources: ["embed.js"],
            },
          ];
        }

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
