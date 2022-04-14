import {
    ApplicationCommandInteraction,
    Client,
    Member,
    SlashCommandOptionType,
    User,
    GuildTextChannel,
    MessageComponentInteraction,
    Permissions
} from "./deps.ts";
import {ButtonComponent} from "https://deno.land/x/harmony@v2.6.0/src/types/messageComponents.ts";

export interface loaderMap {
    commands: Map<string, commandFile>;
    buttons: Map<string, buttonFile>;
}

export type interactionFunction = (interaction: ApplicationCommandInteraction | MessageComponentInteraction, properties: interactionFunctionProperties) => Promise<void>;

// Commands
export interface commandFile {
    name: string;
    description: string;
    options?: commandOption[]
    permissions?: Permissions;
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

interface interactionFunctionProperties {
    client: Client;
    member: Member | undefined;
    user: User;
    channel: GuildTextChannel | undefined;
}

export type commandFunction = (interaction: ApplicationCommandInteraction, properties: interactionFunctionProperties) => Promise<void>;

// Components
export interface buttonFile {
    button: ButtonComponent;
    run: componentFunction;
}

export type componentFunction = (interaction: MessageComponentInteraction, properties: interactionFunctionProperties) => Promise<void>;