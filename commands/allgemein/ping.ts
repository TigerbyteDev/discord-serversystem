import { Client, ApplicationCommandInteraction } from "../../deps.ts"

export const command = {
    name: "ping",
    description: "Pingcommand halt",

    run: async (client: Client, interaction: ApplicationCommandInteraction, user: any, member: any): Promise<void> => {
        await interaction.reply("ping", {
            ephemeral: true
        })
        return;
    }
}