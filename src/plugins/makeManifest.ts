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

        const match = userScriptHeader
          .filter(([key]) => {
            return key === "@match";
          })
          .map(([key, val]) => {
            return val;
          });

        if (match !== undefined) {
          if (manifest.content_scripts === undefined) {
            manifest.content_scripts = [
              {
                matches: match,
                js: ["contentScript.js"],
              },
            ];
          } else {
            manifest.content_scripts.push({
              matches: match,
              js: ["contentScript.js"],
            });
          }

          if (manifest.web_accessible_resources === undefined) {
            manifest.web_accessible_resources = [
              {
                matches: match,
                resources: ["embed.js"],
              },
            ];
          } else {
            manifest.web_accessible_resources.push({
              matches: match,
              resources: ["embed.js"],
            });
          }
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
