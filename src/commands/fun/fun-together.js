const {MessageActionRow, MessageButton} = require("discord.js");

module.exports = {
    name: "fun-together",
    description: "Spiele oder schaue etwas mit deinen Freunden",
    options: [{
        name: "dienst",
        type: "STRING",
        description: "Welchen Dienst ihr benutzen wollt",
        required: true,
        choices: [{
            name: 'Kino', value: '880218394199220334'
        }, {
            name: 'Poker', value: '755827207812677713',
        }, {
            name: 'Schach', value: '832012774040141894',
        }, {
            name: 'Betrayal.io', value: '773336526917861400',
        }, {
            name: 'Fischen', value: '814288819477020702',
        }, {
            name: 'Scrabble', value: '879863686565621790',
        }, {
            name: 'Wordsnack', value: '879863976006127627',
        }, {
            name: 'Scribble.io', value: '878067389634314250',
        }, {
            name: 'Awkword', value: '879863881349087252',
        }, {
            name: 'Spellcast', value: '852509694341283871',
        }, {
            name: 'Dame', value: '832013003968348200',
        }]
    }, {
        name: "channel",
        type: "CHANNEL",
        description: "Der Sprachkanal, wo der Dienst gestartet wird",
        required: true
    }],

    run: async (interaction, client, tdhandler) => {
        const dienst = await interaction.options.get("dienst")?.value
        const channelID = await interaction.options.get("channel")?.value
        const channel = await client.channels.fetch(channelID)

        if (!channel?.isVoice()) {
            await interaction.reply({
                embeds: [await tdhandler.createEmbed("error")
                    .setAuthor({
                        name: "Der angegebene Sprachkanal existiert nicht!", iconURL: client.user.avatarURL()
                    })]
            })
            return false;
        }

        const invite = await fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: 'POST',
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: dienst,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                'Authorization': `Bot ${client.token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

        await interaction.reply({
            content: "Klicke auf den Knopf, um beizutreten",
            components: [
                new MessageActionRow()
                    .addComponents(new MessageButton()
                        .setLabel("Beitreten! 🥳")
                        .setStyle("LINK")
                        .setURL(`https://discord.gg/${invite.code}`)
                    )
            ]
        })

        return true;
    }
}