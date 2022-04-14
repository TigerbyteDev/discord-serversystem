import {commandFile} from "../../types.ts";
import {Embed, SlashCommandOptionType} from "../../deps.ts";
import {getOption} from "../../functions.ts";

const commandSetup: commandFile = {
    name: "poll",
    description: "Starte eine Umfrage",
    options: [{
        name: 'frage',
        type: SlashCommandOptionType.STRING,
        description: 'Die Frage der Umfrage',
        required: true,
    },
        {
            name: '1',
            type: SlashCommandOptionType.STRING,
            description: 'Die erste Antwortmöglichkeit',
            required: true,
        },
        {
            name: '2',
            type: SlashCommandOptionType.STRING,
            description: 'Die zweite Antwortmöglichkeit',
            required: true,
        },
        {
            name: '3',
            type: SlashCommandOptionType.STRING,
            description: 'Die dritte Antwortmöglichkeit',
            required: false,
        },
        {
            name: '4',
            type: SlashCommandOptionType.STRING,
            description: 'Die vierte Antwortmöglichkeit',
            required: false,
        },
        {
            name: '5',
            type: SlashCommandOptionType.STRING,
            description: 'Die fünfte Antwortmöglichkeit',
            required: false,
        }],

    run: async (interaction) => {
        const frage = getOption(interaction, "frage")?.value

        const erste = getOption(interaction, "1")?.value
        const zweite = getOption(interaction, "2")?.value

        let desc = `1️⃣  ${erste}\n2️⃣  ${zweite}`;

        if (getOption(interaction, "3")?.value) desc = desc.concat(`\n3️⃣  ${getOption(interaction, "3")?.value}`);
        if (getOption(interaction, "4")?.value) desc = desc.concat(`\n4️⃣  ${getOption(interaction, "4")?.value}`);
        if (getOption(interaction, "5")?.value) desc = desc.concat(`\n5️⃣  ${getOption(interaction, "5")?.value}`);

       await interaction.reply({
            embeds: [
                new Embed()
                    .setTitle(frage)
                    .setAuthor("Wählt ein Emoji, um abzustimmen")
                    .setDescription(desc)
            ]
       })
    }
}