import { type Plugin } from "esbuild";
import { type JSONSchemaForGoogleChromeExtensionManifestFiles } from "../chrome-manifest-type";
import { type UserScriptHeader } from "../config-type";
export declare function makeManifest(manifest: JSONSchemaForGoogleChromeExtensionManifestFiles, userScriptHeader: UserScriptHeader): Plugin;
