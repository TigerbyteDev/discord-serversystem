import {ButtonStyle, Embed, MessageComponentType, SlashCommandOptionType} from "../../deps.ts"
import {commandFile} from "../../types.ts";
import {getOption} from "../../functions.ts";

export const commandSetup: commandFile = {
    name: "fun-together",
    description: "Spiele oder schaue etwas mit deinen Freunden",
    options: [
        {
            name: "dienst",
            type: SlashCommandOptionType.STRING,
            description: "Welchen Dienst ihr benutzen wollt",
            required: true,
            choices: [
                {
                    name: 'Kino',
                    value: '880218394199220334'
                },
                {
                    name: 'Poker',
                    value: '755827207812677713',
                },
                {
                    name: 'Schach',
                    value: '832012774040141894',
                },
                {
                    name: 'Betrayal.io',
                    value: '773336526917861400',
                },
                {
                    name: 'Fischen',
                    value: '814288819477020702',
                },
                {
                    name: 'Scrabble',
                    value: '879863686565621790',
                },
                {
                    name: 'Wordsnack',
                    value: '879863976006127627',
                },
                {
                    name: 'Scribble.io',
                    value: '878067389634314250',
                },
                {
                    name: 'Awkword',
                    value: '879863881349087252',
                },
                {
                    name: 'Spellcast',
                    value: '852509694341283871',
                },
                {
                    name: 'Dame',
                    value: '832013003968348200',
                }
            ]
        },
        {
            name: "channel",
            type: SlashCommandOptionType.CHANNEL,
            description: "Der Sprachkanal, wo der Dienst gestartet wird",
            required: true
        }
    ],

    run: async (interaction, client) => {
        const dienst = await getOption(interaction, "dienst")?.value
        const channelID = await getOption(interaction, "channel")?.value
        const channel = await client.channels.fetch(channelID)

        if (!channel?.isVoice()) {
            await interaction.reply({
                    embeds: [
                        new Embed()
                            .setColor("RED")
                            .setAuthor({
                                name: "Der angegebene Sprachkanal existiert nicht!",
                            })
                    ]
                }
            )
            return;
        }

        const invite = await client.rest.api.channels[channelID]?.invites
            .post({
                max_age: 604800,
                max_users: 0,
                target_application_id: dienst,
                target_type: 2,
                temporary: false
            })

        await interaction.reply("Klicke auf den Knopf, um beizutreten", {
            components: [
                {
                    type: MessageComponentType.ACTION_ROW,
                    components: [{
                        type: MessageComponentType.BUTTON,
                        label: "Beitreten! 🥳",
                        style: ButtonStyle.LINK,
                        url: `https://discord.gg/${invite.code}`
                    }]
                }
            ]
        })

        return;
    }
}