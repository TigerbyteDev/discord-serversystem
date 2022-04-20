module.exports = {
    name: "clear",
    description: "Lösche mehrere Nachrichten",
    options: [
        {
            name: "anzahl",
            type: "INTEGER",
            description: "Die Anzahl der Nachrichten, welche gelöscht werden sollen",
            required: true
        }
    ],
    clientPermissions: ["MANAGE_MESSAGES"],
    userPermissions: ["MANAGE_MESSAGES"],

    run: async ({interaction, tdhandler, user}) => {
        const anzahl = interaction.options.get("anzahl")?.value;

        if (anzahl < 1 || anzahl > 100) {
            interaction.reply({
                embeds: [
                    tdhandler.createEmbed("error")
                        .setDescription("Die Anzahl muss zwischen 1 und 1000 liegen!")
                ],
                ephemeral: true
            });
            return false;
        }

        await interaction.reply({
            content: `Lösche **${anzahl}** Nachrichten...`,
            ephemeral: true
        });

        await interaction.channel.bulkDelete(anzahl, true)

        await interaction.channel.send({
            embeds: [
                tdhandler.createEmbed("default")
                    .setDescription(`
                **${anzahl}** Nachrichten wurden gelöscht!
                Löschung angefragt von ${user}
                `)
            ]
        });

        return true;
    }
}