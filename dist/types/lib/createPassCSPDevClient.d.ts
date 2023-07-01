import { type UserScriptHeader, type DevServer } from "../config-type";
export declare function createPassCSPDevClient({ host, port }: DevServer, userScriptHeader: UserScriptHeader): Promise<void>;
