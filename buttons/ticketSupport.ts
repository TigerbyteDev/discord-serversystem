import {
    ButtonStyle,
    ChannelTypes,
    Embed,
    format,
    MessageComponentData,
    MessageComponentType,
    OverwriteType,
    Permissions
} from "../deps.ts";
import {buttonFile} from "../types.ts";
import {getButton} from "../functions.ts";

export const buttonSetup: buttonFile = {
    button: {
        type: MessageComponentType.BUTTON,
        label: "Neues Ticket 📢",
        style: ButtonStyle.GREY,
        customID: "ticketsupport"
    },
    run: async (interaction, {
        user,
    }) => {
        const channel = await interaction.guild?.createChannel({
            name: `ticket-von-${user.username}`,
            type: ChannelTypes.GUILD_TEXT,
            topic: `Ein Ticket von ${user}. Erstellt am ${format(new Date(), "dd-MM-yyyy")}`,
            permissionOverwrites: [
                {
                    id: interaction.guild?.id,
                    type: OverwriteType.ROLE,
                    // @ts-ignore Typescript seem to want to get a string, which throws an API Error
                    allow: new Permissions(0),
                    // @ts-ignore Typescript seem to want to get a string, which throws an API Error
                    deny: new Permissions(["VIEW_CHANNEL"])
                },
                {
                    id: user.id,
                    type: OverwriteType.USER,
                    // @ts-ignore Typescript seem to want to get a string, which throws an API Error
                    allow: new Permissions(["VIEW_CHANNEL"]),
                    // @ts-ignore Typescript seem to want to get a string, which throws an API Error
                    deny: new Permissions(0)
                }
            ]
        })

        if (!channel?.isGuildText()) return;

        // @ts-ignore bruh...
        const delbutton: MessageComponentData = await getButton("delticket")
        const message = await channel?.send({
            content: "@everyone",
            embeds: [
                new Embed()
                    .setTitle("Ein neues Ticket wurde erstellt!")
                    .setDescription("Es wird sich bald Jemand um dich kümmern, währenddessen kannst du dein Anliegen schildern! 📌")
            ],
            components: [
                {
                    type: MessageComponentType.ACTION_ROW,
                    components: [delbutton]
                }
            ]
        })

        await message.pinMessage()
    }
}