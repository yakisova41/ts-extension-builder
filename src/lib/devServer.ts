import { join } from "path";
import { WebSocketServer } from "ws";
import getConfig from "./getConfig";
import express from "express";

export function DevServer(): {
  start: () => void;
  reload: () => void;
} {
  let hotServer: { reload: () => void } | undefined;

  const serverControl = {
    start: async () => {
      hotServer = await startHotServer();
      startExpress();
    },
    reload: () => {
      if (hotServer !== undefined) {
        hotServer.reload();
      }
    },
  };

  return serverControl;
}

function startExpress(): void {
  void getConfig().then(({ devServer }) => {
    if (devServer !== undefined) {
      const app = express();

      app.get("/script", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.sendFile(join(__dirname, "../tmp", "script.js"));
      });

      app.get("/index.user.js", (req, res) => {
        res.sendFile(join(__dirname, "../tmp", "client.user.js"));
      });

      app.listen(devServer.port, devServer.host, () => {
        console.log(
          "[" + "\x1b[32m" + "DevServer" + "\x1b[39m" + "]",
          `Dev server started on http://${devServer.host}:${devServer.port}`
        );

        console.log(
          "[" + "\x1b[32m" + "DevServer" + "\x1b[39m" + "]",
          `Script url: http://${devServer.host}:${devServer.port}/index.user.js`
        );
      });
    }
  });
}

async function startHotServer(): Promise<{ reload: () => void }> {
  return await new Promise((resolve) => {
    void getConfig().then(({ devServer }) => {
      if (devServer !== undefined) {
        const wserver = new WebSocketServer({ port: devServer.websocket });

        console.log(
          "[" + "\x1b[36m" + "HotServer" + "\x1b[39m" + "]",
          `Hot server started on ws://${devServer.host}:${devServer.websocket}`
        );

        wserver.on("connection", (ws) => {
          ws.send("connect");
        });
        resolve({
          reload: () => {
            wserver.clients.forEach((client) => {
              client.send("reload");
            });
          },
        });
      }
    });
  });
}
