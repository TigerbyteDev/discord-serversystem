// Importing Libraries
import { Client, Intents, env } from "./deps.ts"

// Importing Functions
import { commandLoader } from "./loading/commands.ts"
import { errorReply } from "./functions.ts";

// Importing Types
import { loaderMap, commandFunction } from "./types.ts"

const maps: loaderMap = {
    commands: new Map(),
};

const client = new Client()

client.on("ready", async () => {
    await commandLoader(client, maps, Deno.cwd())
    console.log(`Serversystem gestartet! Eingeloggt als ${client.user?.tag}!`)
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isApplicationCommand()) return;
    const command: commandFunction = maps.commands.get(interaction.name)?.run ?? errorReply
    await command(interaction, client, interaction.member, interaction.user)
})

let token = Deno.env.get("TOKEN");

if (!token) {
    token = env["TOKEN"]
}

await client.connect(token, Intents.None);
