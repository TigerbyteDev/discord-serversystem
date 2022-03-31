import { commandFile } from "../../types.ts";
import { SlashCommandOptionType } from "../../deps.ts";
import { getOption } from "../../functions.ts";
import { characters } from "../../config.ts"

export const commandSetup: commandFile = {
    name: "emojify",
    description: "Wandelt einen Text in Emojis um",
    options: [{
        name: "text",
        type: SlashCommandOptionType.STRING,
        description: "Der Text, welcher modifiziert werden soll",
        required: true
    }],
    run: async (interaction) => {
        for await (const character of "abcdefghijklmnopqrstuvwxyz".split("")) {
            // @ts-ignore
            characters[character] = characters[character.toUpperCase()] = `:regional_indicator_${character}:`;
        }

        const input = getOption(interaction, "text")?.value
        await interaction.reply(
            input
                .split("")
                // @ts-ignore
                .map((c) => characters[c] || c)
                .join("")
        )
    }
}