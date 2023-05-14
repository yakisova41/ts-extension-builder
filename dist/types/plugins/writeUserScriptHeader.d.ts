import { type Plugin } from "esbuild";
import { type UserScriptHeader } from "../config-type";
export declare function writeUserscriptHeader(userScriptHeader: UserScriptHeader): Plugin;
export declare function createUserScriptHeaderString(userScriptHeader: UserScriptHeader): string;
