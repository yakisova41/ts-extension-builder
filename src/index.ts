import { ConsoleApp } from "./lib/Console";
import buildCommand from "./commands/buildCommand";
import devCommand from "./commands/devCommand";

const consoleApp = new ConsoleApp();
consoleApp.addCommand("build", buildCommand, [
  {
    name: "type",
    description: "extension, userscript",
  },
  {
    name: "minify",
    description: "boolean",
  },
  {
    name: "env",
    description: "development, production",
  },
]);

consoleApp.addCommand("dev", devCommand, [
  {
    name: "type",
    description: "userscript",
  },
  {
    name: "minify",
    description: "boolean",
  },
]);

consoleApp.run();
