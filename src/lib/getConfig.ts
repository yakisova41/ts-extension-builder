import { promises } from "fs";
import { type TsExtensionBuilderConfig } from "../config-type";

export async function getConfigPath(): Promise<string | null> {
  return await new Promise((resolve, reject) => {
    let dir = process.cwd();

    const searchThen = (isExistConfig: boolean): void => {
      if (isExistConfig) {
        resolve(dir + "/ts-extension-config.js");
      } else {
        const splited = dir.split("/");
        if (splited.length === 1) {
          reject(new Error("config file not found"));
        } else {
          splited.pop();
          dir = splited.join("/");
          void search(dir).then(searchThen);
        }
      }
    };

    void search(dir).then(searchThen);
  });
}

async function search(dir: string): Promise<boolean> {
  return await new Promise((resolve) => {
    void promises.readdir(dir + "/").then((files) => {
      files.forEach((fileName) => {
        if (fileName === "ts-extension-config.js") {
          resolve(true);
        }
      });

      resolve(false);
    });
  });
}

export default async function getConfig(): Promise<TsExtensionBuilderConfig> {
  return await new Promise((resolve) => {
    void getConfigPath().then((configPath) => {
      if (configPath !== null) {
        void import(configPath).then((buildConfig) => {
          resolve(buildConfig.default);
        });
      }
    });
  });
}
