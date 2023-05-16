import getConfig from "src/lib/getConfig";
import buildOptionsFactory from "../lib/buildOptionsFactory";
import { build } from "esbuild";
import { join } from "path";
import { makeManifest } from "src/plugins/makeManifest";
import { makeLocales } from "src/plugins/makeLocales";
import { copyAssets } from "src/plugins/copyAssets";

export default function extensionBuild(
  minify: boolean,
  env: "development" | "production"
): void {
  const workingDir = process.cwd();

  void getConfig().then(async ({ esBuild, manifest, locales, assetsDir }) => {
    if (manifest !== undefined) {
      const options = buildOptionsFactory(
        {
          logLevel: "info",
          plugins: [
            makeManifest(manifest),
            ...(locales !== undefined ? [makeLocales(locales)] : []),
            ...(assetsDir !== undefined ? [copyAssets(assetsDir)] : []),
          ],
          define: {
            "process.env.NODE_ENV": `'${env}'`,
          },
          bundle: true,
          minify,
          entryPoints: [join(workingDir, "src", "index.ts")],
          outfile: join(workingDir, "dist", `/extension/contentScript.js`),
        },
        esBuild
      );

      void build(options);
    }
  });
}
