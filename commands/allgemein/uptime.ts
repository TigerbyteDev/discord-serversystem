import { commandFile } from "../../types.ts"
import { ms } from "../../deps.ts"

export const commandSetup: commandFile = {
    name: "uptime",
    description: "Pong halt",

    run: async (interaction, client): Promise<void> => {
        await interaction.reply(`Online seit ${ms(client.uptime)}`, {
            ephemeral: true
        })
        return;
    }
}