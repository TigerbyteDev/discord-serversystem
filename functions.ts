import { commandFunction } from "./types.ts";

export const errorReply: commandFunction = async (interaction) => {
    await interaction.reply("Diesen Befehl gibt es nicht :/")
    return;
}