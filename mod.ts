// Importing Libraries
import { Client, Intents, env } from "./deps.ts"

// Importing Loaders
import { moduleLoader } from "./loading/commands.ts"

const maps = {
    commands: new Map(),
    events: new Map()
};

const client = new Client()

client.on("ready", async () => {
    await moduleLoader(client, maps, Deno.cwd())
    console.log(`Serversystem gestartet! Eingeloggt als ${client.user?.tag}!`)
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isApplicationCommand()) return;
    const command = maps.commands.get(interaction.name)
    await command(client, interaction, interaction.user, interaction.member)
})

let token = Deno.env.get("TOKEN");

if (!token) {
    token = env["TOKEN"]
}

await client.connect(token, Intents.None);
