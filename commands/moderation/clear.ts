import {commandFile} from "../../types.ts";
import {SlashCommandOptionType, Permissions} from "../../deps.ts";
import {getOption} from "../../functions.ts";

export const commandSetup: commandFile = {
    name: "clear",
    description: "Lösche eine gewisse Menge Nachrichten",
    options: [
        {
            name: "anzahl",
            type: SlashCommandOptionType.INTEGER,
            description: "Die Anzahl der Nachrichten, welche du löschen möchtest",
            required: true
        }
    ],
    permissions: new Permissions(["MANAGE_MESSAGES"]),

    run: async (interaction, {
        user,
        channel
    }) => {
        const anzahl = getOption(interaction, "anzahl")?.value;
        if (anzahl < 1 || anzahl > 1000 ) {
            await interaction.reply({
                content: "Du kannst nur Zahlen zwischen 1 und 1000 wählen!",
                ephemeral: true
            })
            return;
        }

        const message = await interaction.reply({
            content: `⏳ Löschung von ${anzahl} Nachrichten gestartet...`,
            ephemeral: true
        })
        await channel?.bulkDelete(anzahl + 1)
        await message.channel?.send(`✅ Löschung von **${anzahl} Nachrichten** abgeschlossen! Löschung angefordert von **${user.username}**`)
    }
}