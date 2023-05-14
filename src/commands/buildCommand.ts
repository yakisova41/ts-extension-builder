import { type HandlerFunc } from "../lib/Console";
import userScriptBuild from "../builds/userScriptBuild";
import extensionBuild from "src/builds/extensionBuild";

const build: HandlerFunc = (argv) => {
  let minify = false;
  let buildType: "userscript" | "extension" = "extension";
  let env: "development" | "production" = "production";

  if (argv.type === "userscript") {
    buildType = "userscript";
  }

  if (argv.env === "development") {
    env = "development";
  }

  if (typeof argv.minify === "boolean") {
    minify = argv.minify;
  }

  if (buildType === "userscript") {
    userScriptBuild(minify, env);
  }

  if (buildType === "extension") {
    extensionBuild(minify, env);
  }
};

export default build;
