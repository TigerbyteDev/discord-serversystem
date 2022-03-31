import { join, Client } from "../deps.ts"

import { loaderMap } from "../types.ts"

export const commandLoader = async (client: Client, map: loaderMap, dirname: string) => {
    const slashCommands = []
    console.log("Lade Befehle...");
    console.log(Deno.cwd())
    const folders = await Deno.readDir(join(dirname, "./commands"))
    for await (const folder of folders) {
        if (!folder.isDirectory) continue
        const commands = await Deno.readDir(join(dirname, "./commands", folder.name))

        for await (const file of commands) {
            let status = false
            if (!file.name.endsWith(".ts")) continue
            const { commandSetup } = await import(`../commands/${folder.name}/${file.name}`)

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
}