import { commandFunction } from "./types.ts";
import {ApplicationCommandInteraction, Client} from "./deps.ts"

export const errorReply: commandFunction = async (interaction) => {
    await interaction.reply("Diesen Befehl gibt es nicht :/")
    return;
}

export const resetAPI = async (client: Client): Promise<void> => {
    for await (const guild of await client.guilds.array()) {
        await client.interactions.commands.bulkEdit([], guild.id)
    }
}

export const getOption = (interaction: ApplicationCommandInteraction, text: string) => {
    return interaction.options.find(o => o.name === text)
}