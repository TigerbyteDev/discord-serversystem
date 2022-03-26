import { ApplicationCommandInteraction, Client } from "./deps.ts";

export interface loaderMap {
    commands: Map<string, commandFile>;
}

export interface commandFile {
    name: string;
    description: string;
    // TODO: Type hinzufügen für commandFile
    options?: any[]

    run: commandFunction;
}

// TODO: Type hinzufügen für commandFunction
export type commandFunction = (interaction: ApplicationCommandInteraction, client?: Client, user?: any, member?: any) => Promise<void>;