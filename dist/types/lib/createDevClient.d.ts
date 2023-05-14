import { type UserScriptHeader, type DevServer } from "../config-type";
export declare function createDevClient({ host, port, websocket }: DevServer, userScriptHeader: UserScriptHeader): Promise<void>;
