const { Client } = require("discord.js");
const { TDInstance } = require("tdhandler");
require("dotenv").config();

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
});

new TDInstance({
    handling: {
        baseDir: __dirname,
        eventsDir: "./events",
        // commandsDir: "./commands",
        buttonsDir: "./buttons",
        // contextDir: "./context",
    },
    logging: {
        commandsID: "955531040330498091",
        buttonsID: "955531040330498091",
        // contextID: "955531040330498091",
        othersID: "955531040330498091"
    },
    embeds: {
        warningEmbed: {
            color: "RED",
            title: "Achtung! ⚠️",
        },
        defaultEmbed: {
            color: "BLUE",
            timestamp: true,
        },
        loggingEmbed: {
            color: "YELLOW",
            timestamp: true,
        },
    },
    team: [
        {
            tag: "Adam ^^#7729",
            id: "0123456789",
            position: "412021620572422155",
        },
    ],
    testing: {
        botID: "803017957528698913",
        guildID: "751938789412175974",
    }
})

client.on('ready', async () => {
    await tdhandler.init(client);
    console.log(`Logged in as ${client.user.username}`);
});

client.login(process.env["TOKEN"]);