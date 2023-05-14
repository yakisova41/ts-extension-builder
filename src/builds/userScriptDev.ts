import getConfig from "../lib/getConfig";
import buildOptionsFactory from "../lib/buildOptionsFactory";
import { context } from "esbuild";
import { join } from "path";
import { createDevClient } from "../lib/createDevClient";
import { DevServer } from "../lib/devServer";

export default function userScriptDev(minify: boolean): void {
  const workingDir = process.cwd();

  void getConfig().then(async ({ userScriptHeader, esBuild, devServer }) => {
    /**
     * development build
     */
    if (devServer !== undefined) {
      await createDevClient(devServer, userScriptHeader);
    }

    const options = buildOptionsFactory(
      {
        minify,
        logLevel: "info",
        define: {
          "process.env.NODE_ENV": "'development'",
        },
        plugins: [
          {
            name: "onend",
            setup(build) {
              build.onEnd(() => {
                ds.reload();
              });
            },
          },
        ],
        bundle: true,
        entryPoints: [join(workingDir, "src", "index.ts")],
        outfile: join(__dirname, "../tmp/script.js"),
      },
      esBuild
    );

    const ctx = await context(options);
    const ds = DevServer();

    void ctx.watch().then(() => {
      ds.start();
    });
  });
}
