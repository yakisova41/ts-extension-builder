import { type BuildOptions } from "esbuild";

export default function buildOptionsFactory(
  options: BuildOptions,
  configOptions?: EsbuildOptionsStringKey
): BuildOptions {
  const buildOptions: EsbuildOptionsStringKey = options;

  if (configOptions !== undefined) {
    Object.keys(configOptions).forEach((key) => {
      if (key === "plugins" && buildOptions.plugins !== undefined) {
        buildOptions.plugins = [...buildOptions.plugins, ...configOptions[key]];
      } else {
        buildOptions[key] = configOptions[key];
      }
    });
  }

  return buildOptions;
}

type EsbuildOptionsStringKey = {
  [key in keyof BuildOptions | string]: any;
};
