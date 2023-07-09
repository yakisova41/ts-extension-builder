import { type JSONSchemaForGoogleChromeExtensionManifestFiles } from "./chrome-manifest-type";
import { type BuildOptions } from "esbuild";
export interface TsExtensionBuilderConfig {
    userScriptHeader: UserScriptHeader;
    devServer?: DevServer;
    esBuild?: BuildOptions;
    manifest?: JSONSchemaForGoogleChromeExtensionManifestFiles;
    locales?: Locales;
    assetsDir?: string;
    noSandbox?: boolean;
    passCSP?: boolean;
    extensionLoadMode?: "contentScript" | "inject";
}
export interface DevServer {
    port: number;
    host: string;
    websocket: number;
}
export type UserScriptHeader = Array<[keyof UserScriptHeaderProps, string]>;
export interface UserScriptHeaderProps {
    "@name": string;
    "@namespace"?: string;
    "@copyright"?: string;
    "@version": string;
    "@description"?: string;
    "@icon"?: string;
    "@iconURL"?: string;
    "@defaulticon"?: string;
    "@icon64"?: string;
    "@icon64URL"?: string;
    "@grant"?: string;
    "@author"?: string;
    "@homepage"?: string;
    "@homepageURL"?: string;
    "@website"?: string;
    "@source"?: string;
    "@antifeature"?: string;
    "@require"?: string;
    "@resource"?: string;
    "@include"?: string;
    "@match"?: string;
    "@exclude"?: string;
    "@run-at"?: string;
    "@sandbox"?: string;
    "@connect"?: string;
    "@noframes"?: string;
    "@updateURL"?: string;
    "@downloadURL"?: string;
    "@supportURL"?: string;
    "@webRequest"?: string;
    "@unwrap"?: string;
}
export type Locales = Record<string, Record<string, {
    message?: string;
    description?: string;
    placeholders?: Record<string, {
        content?: string;
        example?: string;
    }>;
}>>;
