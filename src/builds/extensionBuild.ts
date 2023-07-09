import getConfig from "src/lib/getConfig";
import buildOptionsFactory from "../lib/buildOptionsFactory";
import { build } from "esbuild";
import { join } from "path";
import { makeManifest } from "src/plugins/makeManifest";
import { makeLocales } from "src/plugins/makeLocales";
import { copyAssets } from "src/plugins/copyAssets";
import { makeContentScript } from "src/plugins/makeContentScript";
import createEntry from "src/lib/createEntry";

export default function extensionBuild(
  minify: boolean,
  env: "development" | "production"
): void {
  const workingDir = process.cwd();

  void getConfig().then(
    async ({
      esBuild,
      manifest,
      locales,
      assetsDir,
      userScriptHeader,
      extensionLoadMode,
    }) => {
      if (manifest !== undefined) {
        const loadMode =
          extensionLoadMode === undefined ? "inject" : extensionLoadMode;

        const options = buildOptionsFactory(
          {
            logLevel: "info",
            plugins: [
              makeManifest(manifest, userScriptHeader, loadMode),
              ...(locales !== undefined ? [makeLocales(locales)] : []),
              ...(assetsDir !== undefined ? [copyAssets(assetsDir)] : []),
              ...(loadMode === "inject" ? [makeContentScript()] : []),
            ],
            define: {
              "process.env.NODE_ENV": `'${env}'`,
            },
            bundle: true,
            minify,
            format: "cjs",
            entryPoints: [createEntry(join(workingDir, "src", "index.ts"))],
            outfile: join(
              workingDir,
              "dist",
              loadMode === "inject"
                ? `/extension/embed.js`
                : "/extension/contentScript.js"
            ),
          },
          esBuild
        );

        void build(options);
      }
    }
  );
}
