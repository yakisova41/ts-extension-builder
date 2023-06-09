import { writeFileSync, existsSync, mkdirSync } from "fs";
import { type UserScriptHeader, type DevServer } from "../config-type";
import { join } from "path";
import { createUserScriptHeaderString } from "../plugins/writeUserScriptHeader";

function scriptFactory(
  host: string,
  port: number,
  sockport: number,
  userScriptHeader: UserScriptHeader
): string {
  return `${createUserScriptHeaderString(userScriptHeader)}
const socket = new WebSocket("ws://${host}:${sockport}");
  socket.onmessage = (event) => {
      switch (event.data) {
          case "reload":
              console.log("[ts-extension-builder] hotreload");
              window.location.reload();
              break;
          case "connect":
              console.log(
                  "[ts-extension-builder] hotreload server connected"
              );
              break;
      }
  };

import("http://${host}:${port}/script").then(module => {
  const args = {}
  if(GM_info.script.grant !== undefined){
    GM_info.script.grant.forEach(propatyName => {
      let keyName = propatyName.split("GM_")[1];

      if(keyName === "xmlhttpRequest"){
          keyName = "xmlHttpRequest"
      }
      args[propatyName] = GM[keyName]
    })
  }
  module.default(args)
})`;
}

export async function createDevClient(
  { host, port, websocket }: DevServer,
  userScriptHeader: UserScriptHeader
): Promise<void> {
  if (!existsSync(join(__dirname, "../tmp"))) {
    mkdirSync(join(__dirname, "../tmp"));
  }
  writeFileSync(
    join(__dirname, "../tmp/client.user.js"),
    scriptFactory(host, port, websocket, userScriptHeader)
  );
}
