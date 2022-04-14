// Importing Libraries
import {
    Client,
    Intents,
    env,
    GuildTextChannel,
    Permissions
} from "./deps.ts"

// Importing Functions
import {commandLoader} from "./loading/commands.ts"
import {buttonLoader} from "./loading/buttons.ts";
import {errorReply, resetAPI} from "./functions.ts";

// Importing Types
import {loaderMap, commandFunction, componentFunction, commandFile} from "./types.ts"

export const maps: loaderMap = {
    commands: new Map(),
    buttons: new Map()
};
const client = new Client()

client.on("ready", async () => {
    await resetAPI(client)
    await commandLoader(client, maps, Deno.cwd())
    await buttonLoader(maps, Deno.cwd())
    console.log(`Serversystem gestartet! Eingeloggt als ${client.user?.tag}!`)
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isApplicationCommand()) {
        if (!interaction.guild) return;
        // @ts-ignore @TODO fix types
        const command: commandFile = maps.commands.get(interaction.name) ?? errorReply
        console.log(command)
        if (!interaction.member?.permissions.has(command?.permissions ?? new Permissions("VIEW_CHANNELS"))) {
            await interaction.reply({
                content: "Dir fehlen Berechtigungen, um diesen Befehl auszuführen!",
                ephemeral: true
            })
            return;
        }

        await command?.run(interaction, {
            client: client,
            member: interaction.member,
            user: interaction.user,
            channel: interaction.channel as GuildTextChannel ?? undefined
        })
    }

    if (interaction.isMessageComponent()) {
        const button: componentFunction = maps.buttons.get(interaction.customID)?.run ?? errorReply
        await button(interaction, {
            client: client,
            member: interaction.member,
            user: interaction.user,
            channel: interaction.channel as GuildTextChannel ?? undefined
        })
    }
})

let token = Deno.env.get("TOKEN");

if (!token) {
    token = env["TOKEN"]
}

await client.connect(token, Intents.All);
