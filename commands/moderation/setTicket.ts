import {commandFile} from "../../types.ts";
import {ButtonStyle, Embed, MessageComponentType, SlashCommandOptionType, MessageComponentData, Permissions} from "../../deps.ts";
import {getButton, getOption} from "../../functions.ts";

export const commandSetup: commandFile = {
    name: "set-ticket",
    description: "Erstelle die Nachricht für das Ticketsystem",
    permissions: new Permissions(["MANAGE_CHANNELS"]),

    run: async (interaction) => {
        // @ts-ignore
        const ticketButton: MessageComponentData = await getButton("ticketsupport")

        await interaction.reply({
            embeds: [
                new Embed()
                    .setTitle("Kontakt")
                    .setDescription("Klick auf den Knopf um ein neues Ticket zu eröffnen!")
            ],
            components: [
                {
                    type: MessageComponentType.ACTION_ROW,
                    components: [ticketButton]
                }
            ]
        })
    }
}