import { join, Client, SlashCommandPartial } from "../deps.ts"
import { guilds } from "../config.ts"

import { loaderMap } from "../types.ts"

export const commandLoader = async (client: Client, map: loaderMap, dirname: string) => {
    console.log("Lade Befehle...");

    const slashCommands: SlashCommandPartial[] = []
    const folders = await Deno.readDir(join(dirname, "./commands"))

    for await (const folder of folders) {
        if (!folder.isDirectory) continue
        const commands = await Deno.readDir(join(dirname, "./commands", folder.name))

        for await (const file of commands) {
            let status = false
            if (!file.name.endsWith(".ts")) continue;
            const {commandSetup} = await import(`../commands/${folder.name}/${file.name}`)

            if (commandSetup.name && commandSetup.description) {
                map.commands.set(commandSetup.name, commandSetup)
                slashCommands.push({
                    name: commandSetup.name,
                    description: commandSetup.description,
                    options: commandSetup.options ?? null
                })

                status = true
            }

            console.log(`command: ${commandSetup.name} | datei: ${file.name} | geladen: ${status}`)
        }
    }

    for await (const guild of await client.guilds.array()) {
        if (!guilds.includes(guild.id)) continue;
        console.log(`Registriere Befehle in ${guild.name}`)
        await client.interactions.commands.bulkEdit(slashCommands, guild.id)
    }
}
