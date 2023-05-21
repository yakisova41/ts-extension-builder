import { type BuildOptions } from "esbuild";
export default function buildOptionsFactory(options: BuildOptions, configOptions?: EsbuildOptionsStringKey, option?: BuildOptionFcOptions): BuildOptions;
type EsbuildOptionsStringKey = {
    [key in keyof BuildOptions | string]: any;
};
export interface BuildOptionFcOptions {
    createEntry: boolean;
}
export {};
