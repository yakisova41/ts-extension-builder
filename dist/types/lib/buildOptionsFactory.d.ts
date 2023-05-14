import { type BuildOptions } from "esbuild";
export default function buildOptionsFactory(options: BuildOptions, configOptions?: EsbuildOptionsStringKey): BuildOptions;
type EsbuildOptionsStringKey = {
    [key in keyof BuildOptions | string]: any;
};
export {};
