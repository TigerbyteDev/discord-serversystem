import {ApplicationCommandInteraction, Client, Member, SlashCommandOptionType, User} from "./deps.ts";

export interface loaderMap {
    commands: Map<string, commandFile>;
}

export interface commandFile {
    name: string;
    description: string;
    // TODO: Type hinzufügen für commandFile
    options?: commandOption[]

    run: commandFunction;
}

interface commandOption {
    name: string;
    type: SlashCommandOptionType;
    description: string;
    required?: boolean;
}

export type commandFunction = (interaction: ApplicationCommandInteraction, client?: Client, member?: Member, user?: User) => Promise<void>;