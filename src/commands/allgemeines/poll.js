const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

module.exports = {
    name: "poll",
    description: "Starte eine Umfrage",
    options: [{
            name: 'frage',
            type: 'STRING',
            description: 'Die Frage der Umfrage',
            required: true,
        },
        {
            name: '1',
            type: 'STRING',
            description: 'Die erste Antwortmöglichkeit',
            required: true,
        },
        {
            name: '2',
            type: 'STRING',
            description: 'Die zweite Antwortmöglichkeit',
            required: true,
        },
        {
            name: '3',
            type: 'STRING',
            description: 'Die dritte Antwortmöglichkeit',
            required: false,
        },
        {
            name: '4',
            type: 'STRING',
            description: 'Die vierte Antwortmöglichkeit',
            required: false,
        },
        {
            name: '5',
            type: 'STRING',
            description: 'Die fünfte Antwortmöglichkeit',
            required: false,
        }
    ],

    run: async (interaction, client, tdhandler, user) => {
        const frage = interaction.options.get("frage").value;
        const userPB = user.displayAvatarURL({
            dynamic: true
        });

        // Check if the option was choosen, if so add it to the array
        const options = [];
        let skip = false;
        for (i = 1; i <= 5; i++) {
            if (interaction.options.get(i.toString())) {
                const option = interaction.options.get(i.toString()).value;
                const emoji = emojis[i - 1];

                options.push(`${emoji} ${option}`);
            } else {
                skip = i;
                break;
            }
        }
        console.log(options);
        await interaction.reply({
            embeds: [
                await tdhandler.createEmbed("default")
                .setAuthor({
                    name: frage,
                    iconURL: userPB
                })
                .setDescription(options.join("\n"))
            ]
        });

        const reply = await interaction.fetchReply();

        // Add the reactions to the message so the members can vote
        for (i = 1; i <= 5; i++) {
            if (interaction.options.get(i.toString())) {
                const emoji = emojis[i - 1];
                await reply.react(emoji);
            } else {
                break;
            }
        }


        if (skip) {
            await interaction.followUp({
                content: `Alles nach der **${skip}** Antwortmöglichkeit wurde ignoriert, da diese nicht gegeben war.`,
                ephemeral: true
            });
        }
    }
}