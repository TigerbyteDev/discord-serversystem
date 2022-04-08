import {commandFile} from "../../types.ts";
import {Embed, SlashCommandOptionType} from "../../deps.ts"
import {getOption} from "../../functions.ts";

const auswahl: string[] = ['Schere ✂️', 'Stein 🪨', 'Papier 📜']

export const commandSetup: commandFile = {
    name: "schere-stein-papier",
    description: "Spiele Schere-Stein-Papier gegen den Bot",
    options: [
        {
            name: "wahl",
            type: SlashCommandOptionType.STRING,
            description: "Wähle zwischen Schere, Stein und Papier",
            required: true,
            choices: [
                {
                    name: auswahl[0],
                    value: auswahl[0]
                },{
                    name: auswahl[1],
                    value: auswahl[1]
                },{
                    name: auswahl[2],
                    value: auswahl[2]
                }
            ]
        }
    ],

    run: async (interaction, client) => {
        const userWahl = getOption(interaction, "wahl")?.value
        const botWahl = auswahl[Math.floor(Math.random() * auswahl.length)]

        await interaction.reply({
            embeds: [
                new Embed()
                    .setDescription(`
                    **Deine Wahl:** ${userWahl}
                    **${client.user?.username}s Wahl:** ${botWahl}
                    `)
            ],
            ephemeral: true
        })
    }
}