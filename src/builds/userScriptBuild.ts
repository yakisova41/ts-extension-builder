import getConfig from "../lib/getConfig";
import buildOptionsFactory from "../lib/buildOptionsFactory";
import { build } from "esbuild";
import { join } from "path";
import { writeUserscriptHeader } from "src/plugins/writeUserScriptHeader";

export default function userScriptBuild(
  minify: boolean,
  env: "development" | "production"
): void {
  const workingDir = process.cwd();

  void getConfig().then(async ({ userScriptHeader, esBuild, devServer }) => {
    const options = buildOptionsFactory(
      {
        logLevel: "info",
        plugins: [writeUserscriptHeader(userScriptHeader)],
        define: {
          "process.env.NODE_ENV": `'${env}'`,
        },
        bundle: true,
        minify,
        entryPoints: [join(workingDir, "src", "index.ts")],
        outfile: join(workingDir, "dist", `index.user.js`),
      },
      esBuild
    );
    void build(options);
  });
}