module.exports = {
    name: "ping",
    description: "Erhalte den Botping",

    run: async (interaction) => {
        interaction.reply("pong")
    }
}