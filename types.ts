import { ApplicationCommandInteraction, Client, Member, User } from "./deps.ts";

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

export type commandFunction = (interaction: ApplicationCommandInteraction, client?: Client, member?: Member, user?: User) => Promise<void>;