module.exports = {
    name: "ping",
    description: "Erhalte den Botping",

    run: async (interaction, client, tdhandler) => {
        await interaction.reply({
            embeds: [
                await tdhandler.createEmbed("default")
                .setTitle(":ping_pong: Pong!")
                .addFields({
                    "name": 'API Verzögerung',
                    "value": `\`${client.ws.ping}ms\``,
                    "inline": true
                }, {
                    "name": 'Client Verzögerung',
                    "value": `\`${Date.now() - interaction.createdTimestamp}ms\``,
                    "inline": true
                })
            ]
        });

        return true;
    }
}