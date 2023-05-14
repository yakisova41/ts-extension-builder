import { type HandlerFunc } from "../lib/Console";
import userScriptDev from "../builds/userScriptDev";

const dev: HandlerFunc = (argv) => {
  let minify = false;
  let buildType: "userscript" | "extension" = "userscript";

  if (argv.type === "extension") {
    buildType = "extension";
  }

  if (typeof argv.minify === "boolean") {
    minify = argv.minify;
  }

  if (buildType === "userscript") {
    userScriptDev(minify);
  }
};

export default dev;
