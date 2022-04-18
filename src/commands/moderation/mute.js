const {MessageButton, MessageActionRow} = require("discord.js");

const ms = require('ms');

module.exports = {
    name: "mute",
    description: "Schalte eine Person stumm.",
    options: [
        {
            name: 'person',
            description: 'Die Person, die bestraft werden soll.',
            type: 'USER',
            required: true
        },

        {
            name: 'zeit',
            description: 'Die Länge der Strafe.',
            type: 'STRING',
            required: true
        },
        {
            name: 'grund',
            type: 'STRING',
            description: 'Weshalb dies passiert.',
            required: false,
        },
    ],
    clientPermissions: ["TIMEOUT_MEMBERS"],
    userPermissions: ["TIMEOUT_MEMBERS"],

    run: async (interaction, client, tdhandler, user) => {
        const person = interaction.options.get("person");

        if (person?.member.isCommunicationDisabled()) {
            interaction.reply({
                embeds: [
                    tdhandler.createEmbed("error")
                        .setDescription(`${person.member.user} ist bereits bis <t:${person?.member.communicationDisabledUntilTimestamp}:d> stummgeschaltet.`)
                ]
            })

            return false;
        }

        const zeit = interaction.options.get("zeit")?.value;
        const grund = interaction.options.get("grund")?.value ?? `Gesperrt von ${user.username}`;

        if (!zeit || zeit < 0) {
            interaction.reply({
                embeds: [
                    tdhandler.createEmbed("error")
                        .setDescription(`Bitte formatiert die Zeit nach ISO 8601`)
                ],
                components: [
                    new MessageActionRow().addComponents(
                        new MessageButton()
                            .setURL("https://de.wikipedia.org/wiki/ISO_8601#Darstellung")
                            .setLabel("Mehr Informationen zu ISO 8601 📱")
                            .setStyle("LINK")
                    )
                ],
                ephemeral: true
            });

            return false;
        }

        console.log(zeit)
        await person?.member.timeout(zeit, grund);

        await interaction.reply({
            embeds: [
                tdhandler.createEmbed("success")
                    .setDescription(`${person?.user} wurde für **${ms(zeit, {
                        long: true
                    })}** von ${user} stumm geschaltet.`)
            ],
        })

        return true;
    }
}