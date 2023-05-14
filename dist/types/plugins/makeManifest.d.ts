import { type Plugin } from "esbuild";
import { type JSONSchemaForGoogleChromeExtensionManifestFiles } from "../chrome-manifest-type";
export declare function makeManifest(manifest: JSONSchemaForGoogleChromeExtensionManifestFiles): Plugin;
