import { writeFileSync } from "fs";
import { type Plugin } from "esbuild";
import { join, dirname } from "path";
import { type JSONSchemaForGoogleChromeExtensionManifestFiles } from "../chrome-manifest-type";
import { type UserScriptHeader } from "../config-type";

export function makeManifest(
  manifest: JSONSchemaForGoogleChromeExtensionManifestFiles,
  userScriptHeader: UserScriptHeader,
  loadMode: "inject" | "contentScript"
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

        const runAt = userScriptHeader.filter(([key]) => {
          return key === "@run-at";
        });

        let runAtMode:
          | "document_start"
          | "document_end"
          | "document_idle"
          | null;
        if (runAt.length > 0) {
          let mode = runAt[0][1];
          mode = mode.replace("-", "_");
          if (
            mode === "document_start" ||
            mode === "document_end" ||
            mode === "document_idle"
          ) {
            runAtMode = mode;
          } else {
            runAtMode = null;
          }
        } else {
          runAtMode = null;
        }

        if (match !== undefined) {
          if (manifest.content_scripts === undefined) {
            manifest.content_scripts = [
              {
                matches: match,
                js: ["contentScript.js"],
                run_at: runAtMode !== null ? runAtMode : "document_idle",
              },
            ];
          } else {
            manifest.content_scripts.push({
              matches: match,
              js: ["contentScript.js"],
              run_at: runAtMode !== null ? runAtMode : "document_idle",
            });
          }

          if (loadMode === "inject") {
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
