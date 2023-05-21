import { type BuildOptions } from "esbuild";
import createEntry from "./createEntry";

export default function buildOptionsFactory(
  options: BuildOptions,
  configOptions?: EsbuildOptionsStringKey,
  option: BuildOptionFcOptions = { createEntry: true }
): BuildOptions {
  const buildOptions: EsbuildOptionsStringKey = options;

  if (configOptions !== undefined) {
    Object.keys(configOptions).forEach((key) => {
      switch (key) {
        case "plugins":
          if (buildOptions.plugins !== undefined) {
            buildOptions.plugins = [
              ...buildOptions.plugins,
              ...configOptions[key],
            ];
          }
          break;

        case "format":
          buildOptions[key] = [createEntry(configOptions[key])];
          break;

        case "entryPoints":
          if (option.createEntry) {
            buildOptions[key] = [createEntry(configOptions[key])];
          } else {
            buildOptions[key] = configOptions[key];
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
}
