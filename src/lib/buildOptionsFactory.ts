import { type BuildOptions } from "esbuild";
import createEntry from "./createEntry";

export default function buildOptionsFactory(
  options: BuildOptions,
  configOptions?: EsbuildOptionsStringKey,
  option: BuildOptionFcOptions = { createEntry: true, format: "esm" }
): BuildOptions {
  const buildOptions: EsbuildOptionsStringKey = options;

  if (configOptions !== undefined) {
    Object.keys(configOptions).forEach((key) => {
      switch (key) {
        case "plugins":
          if (buildOptions.plugins !== undefined) {
            buildOptions.plugins = [
              ...buildOptions.plugins,
              ...configOptions.plugins,
            ];
          }
          break;

        case "format":
          if (option.format === "cjs") {
            buildOptions.format = "cjs";
          } else if (option.format === "esm") {
            buildOptions.format = "esm";
          } else {
            buildOptions.format = configOptions[key];
          }
          break;

        case "entryPoints":
          if (option.createEntry) {
            buildOptions.entryPoints = configOptions.entryPoints.map(
              (path: string) => createEntry(path)
            );
          } else {
            buildOptions.entryPoints = configOptions.entryPoints;
          }
          break;

        default:
          buildOptions[key] = configOptions[key];
      }
    });
  }

  return buildOptions;
}

type EsbuildOptionsStringKey = {
  [key in keyof BuildOptions | string]: any;
};

export interface BuildOptionFcOptions {
  createEntry: boolean;
  format?: "cjs" | "esm";
}
