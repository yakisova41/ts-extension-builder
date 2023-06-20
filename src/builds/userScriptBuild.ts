import getConfig from "../lib/getConfig";
import buildOptionsFactory from "../lib/buildOptionsFactory";
import { build } from "esbuild";
import { join } from "path";
import { writeUserscriptHeader } from "src/plugins/writeUserScriptHeader";
import createEntry from "src/lib/createEntry";
import { disableUserscriptSandbox } from "src/plugins/disableUserscriptSandbox";

export default function userScriptBuild(
  minify: boolean,
  env: "development" | "production"
): void {
  const workingDir = process.cwd();
  void getConfig().then(
    async ({ userScriptHeader, esBuild, devServer, noSandbox }) => {
      const sandboxMode =
        noSandbox !== undefined && noSandbox
          ? [disableUserscriptSandbox()]
          : [];

      const options = buildOptionsFactory(
        {
          logLevel: "info",
          plugins: [...sandboxMode, writeUserscriptHeader(userScriptHeader)],
          define: {
            "process.env.NODE_ENV": `'${env}'`,
          },
          bundle: true,
          minify,
          format: "cjs",
          entryPoints: [createEntry(join(workingDir, "src", "index.ts"))],
          outfile: join(workingDir, "dist", `index.user.js`),
        },
        esBuild
      );

      void build(options);
    }
  );
}
