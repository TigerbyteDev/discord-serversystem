import { join, Client } from "../deps.ts"

export const moduleLoader = async (client: Client, map: any, dirname: string) => {
    console.log("Lade Befehle...");
    console.log(Deno.cwd())
    const folders = await Deno.readDir(join(dirname, "./commands"))
    for await (const folder of folders) {
        if (!folder.isDirectory) continue;
        const commands = await Deno.readDir(join(dirname, "./commands", folder.name))

        for await (const file of commands) {
            if (!file.name.endsWith(".ts")) continue;
            const { command } = await import(`../commands/${folder.name}/${file.name}`)
            console.log(command)
            map.commands.set(command.name, command.run)
            console.log(map.commands.get(command.name).toString())
        }
    }
}