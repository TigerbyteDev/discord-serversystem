const { Client } = require("discord.js");
const { TDInstance } = require("tdhandler");
require("dotenv").config();

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
});

new TDInstance({
    handling: {
        // The directory the other paths are oriented to
        baseDir: __dirname, 
        // The directory your events are located in
        // eventsDir: "./events",
        // The directory your commands are located in
        commandsDir: "./commands",
        // The directory your buttons are located in
        // buttonsDir: "./buttons",
        // The directory your context menus are located in
        // contextDir: "./context",
    },
    logging: {
        // The ID of the channel your events should be logged in
        eventsID: "955531040330498091",
        // The ID of the channel your commands should be logged in
        commandsID: "955531040330498091",
        // The ID of the channel your buttons should be logged in
        buttonsID: "955531040330498091",
        // The ID of the channel your context menus should be logged in
        contextID: "955531040330498091",
        // The ID of the channel everything other should be logged in
        othersID: "955531040330498091"
    },
    embeds: {
        // The options for different default-embeds
        warningEmbed: {
            color: "RED",
            title: "warning",
            footer: "warn",
            footerIcon: "https://de.wikipedia.org/wiki/Datei:Ia-never-gonna-give-you-up-rick-astley-trionfale-remaster-4k-v3-500421.jpg",
            timestamp: false,
        },
        defaultEmbed: {
            color: "BLUE",
            footer: "default",
            footerIcon: "https://de.wikipedia.org/wiki/Datei:Ia-never-gonna-give-you-up-rick-astley-trionfale-remaster-4k-v3-500421.jpg",
            timestamp: false,
        },
        loggingEmbed: {
            color: "YELLOW",
            timestamp: false,
        },
    },
    // The members of your team
    team: [
        {
            tag: "Adam ^^#7729",
            id: "0123456789",
            position: "412021620572422155",
        },
    ],
    testing: {
        // The ID of your testbot
        botID: "803017957528698913",
        // The ID of your testguild
        guildID: "751938789412175974",
    }
})

client.on('ready', async () => {
    await tdhandler.init(client);
    console.log(`Logged in as ${client.user.username}`);
});

client.login(process.env["TOKEN"]);