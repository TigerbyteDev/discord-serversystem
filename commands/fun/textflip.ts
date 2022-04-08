import {commandFile} from "../../types.ts";
import {SlashCommandOptionType, Embed} from "../../deps.ts";
import {getOption} from "../../functions.ts";
import {upsideDownCharacters} from "../../config.ts"


export const commandSetup: commandFile = {
    name: "textflip",
    description: "Spiegelt einen Text horizontal",
    options: [
        {
            name: "text",
            type: SlashCommandOptionType.STRING,
            description: "Der Text, welcher gespiegelt werden soll",
            required: true
        }
    ],

    run: async (interaction) => {
        const input = getOption(interaction, "text")?.value

        // CODE FROM lakenen WITH MIT LICENSE
        // REPOSITORY AT https://github.com/lakenen/flip-text:
        let result = ""
        let c = input.length
        let ch = ""

        for (; c >= 0; --c) {
            ch = input.charAt(c)
            // @ts-ignore
            result += upsideDownCharacters[ch] || upsideDownCharacters[ch.toLowerCase] || ch
        }
        // END

       await interaction.reply({
           embeds: [
               new Embed()
                   .setTitle(result)
           ]
       })
    }
}