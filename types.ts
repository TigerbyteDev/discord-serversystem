import {ApplicationCommandInteraction, Client, Member, SlashCommandOptionType, User} from "./deps.ts";

export interface loaderMap {
    commands: Map<string, commandFile>;
}

export interface commandFile {
    name: string;
    description: string;
    // TODO: Type hinzufügen für commandFile
    options?: commandOption[]
    ignore?: boolean;

    run: commandFunction;
}

interface commandOption {
    name: string;
    type: SlashCommandOptionType;
    description: string;
    required: boolean;
    choices?: commandOptionChoice[];
}

type commandOptionChoice = {
    name: string;
    value: string;
}

export type commandFunction = (interaction: ApplicationCommandInteraction, client: Client, member: Member | undefined, user: User) => Promise<void>;