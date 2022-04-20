const {MessageButton, MessageActionRow} = require("discord.js");
module.exports = {
    button: {
        label: "Neues Ticket 📢",
        style: "SECONDARY",
        customId: "ticket-support",
        disabled: false
    },

    run: async ({interaction, tdhandler, user}) => {
        const channel = await interaction.guild?.channels.create(`ticket-von-${user.username}`, {
            topic: `Ein Ticket von ${user}. Erstellt am <t:${new Date()}:d>`,
            permissionOverwrites: [
                {
                    id: interaction.guild?.id,
                    type: "role",
                    deny: "VIEW_CHANNEL"
                },
                {
                    id: user.id,
                    type: "member",
                    allow: "VIEW_CHANNEL",
                }
            ]
        })

        await channel?.send({
            content: "@everyone",
            embeds: [
                tdhandler.createEmbed("default")
                    .setTitle("Ein neues Ticket wurde erstellt!")
                    .setDescription("Es wird sich bald Jemand um dich kümmern. Währenddessen kannst du uns hier dein Anliegen schildern.")
            ],
            components: [
                new MessageActionRow()
                    // @TODO Fix button, component doesn't seem to be valid
                    .addComponents(await tdhandler.getButton("delete-ticket"))
            ]
        })
    }
}