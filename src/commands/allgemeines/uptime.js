module.exports = {
    name: "uptime",
    description: "Zeigt, wie lang der Bot bereits online ist",

    run: async (interaction, client, tdhandler) => {
        // format the uptime
        const uptime = client.uptime,
            days = `**${Math.floor(uptime / 86400000)} Tage**`,
            hours = `**${Math.floor((uptime % 86400000) / 3600000)} Stunden**`,
            minutes = `**${Math.floor((uptime % 3600000) / 60000)} Minuten**`,
            seconds = `**${Math.floor((uptime % 60000) / 1000)} Sekunden**`;

        // send the uptime
        await interaction.reply({
            embeds: [
                await tdhandler.createEmbed("default")
                .setTitle(":clock: Uptime")
                .setDescription(`${client.user.username} ist online seit ${days}, ${hours}, ${minutes} und ${seconds}`)
            ]
        })

        return true;
    }
}