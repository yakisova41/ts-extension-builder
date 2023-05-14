export declare class ConsoleApp {
    private readonly handlers;
    constructor();
    addCommand(commandName: string, handler: HandlerFunc, argv?: Arg[], description?: string): void;
    run(): void;
    private getArgv;
    private getHelp;
}
export type Argv = Record<string, string | boolean>;
export interface Arg {
    name: string;
    description: string;
}
export interface Handler {
    key: string;
    handler: HandlerFunc;
    argv: Arg[];
    description: string;
}
export type HandlerFunc = (argv: Argv) => void;
