module.exports = {
    button: {
        label: "🗑️ Lösche das Ticket",
        style: "DANGER",
        customId: "delete-ticket",
        disabled: false
    },

   run: async ({interaction, user}) => {
    await interaction.reply(`Das Ticket wird in **10 Sekunden** gelöscht... Angefragt von ${user}`);
    setTimeout(() => interaction.channel?.delete(), 10000);
    }
}