import {buttonFile} from "../types.ts";
import {ButtonStyle, MessageComponentType} from "../deps.ts";

export const buttonSetup: buttonFile = {
    button: {
        type: MessageComponentType.BUTTON,
        customID: "delticket",
        style: ButtonStyle.RED,
        label: "🗑️ Lösche das Ticket"
    },

    run: async (interaction, {
        user,
        channel
    }) => {
        await interaction.reply(`Das Ticket wird in **10 Sekunden** gelöscht... Angefragt von ${user}`)
        setTimeout(() => channel?.delete(), 10000)
    }
}