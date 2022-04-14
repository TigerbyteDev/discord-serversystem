import { interactionFunction } from "./types.ts";
import {ApplicationCommandInteraction, Client} from "./deps.ts"
import { maps } from "./mod.ts"

export const errorReply: interactionFunction = async (interaction) => {
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

export const getButton = (name: string) => {
    return maps.buttons.get(name)?.button;
}