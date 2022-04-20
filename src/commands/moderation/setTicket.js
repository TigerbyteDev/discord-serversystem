const {MessageActionRow} = require("discord.js");
module.exports = {
    name: "setticket",
    description: "Lege einen Ticketkanal fest.",
    clientPermissions: ["MANAGE_CHANNELS"],

    run: async ({interaction, tdhandler}) =>
        await interaction.reply({
            embeds: [
                tdhandler.createEmbed("default")
                    .setTitle("Kontakt")
                    .setDescription("Klickt auf den Knopf, um Kontakt aufzunehmen!")
            ],
            components: [
                new MessageActionRow()
                    .addComponents(await tdhandler.getButton("ticket-support"))
            ]
        })
}