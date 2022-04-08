import {commandFile} from "../../types.ts";
import {SlashCommandOptionType, Embed} from "../../deps.ts";
import {getOption} from "../../functions.ts";

const subreddits = [
    "meme",
    "memes",
    "ich_iel",
    "marvelmemes",
]

export const commandSetup: commandFile = {
    name: "memes",
    description: "Ein zufälliges Meme von Reddit",
    options: [
        {
            name: "subreddit",
            type: SlashCommandOptionType.STRING,
            description: "Der Subreddit, in welchem zu suchen magst",
            required: false
        }
    ],
    ignore: true,

    run: async (interaction) => {
        const subreddit = await getOption(interaction, "subreddit")?.value ?? subreddits[Math.floor(Math.random() * subreddits.length)]
        const data =await fetch(`https://www.reddit.com/r/${subreddit}/comments/txnqgr/${subreddit}/.json?utm_campaign=redirect&utm_medium=desktop&utm_source=reddit&utm_name=random_link`)
        // @TODO: API broken oder so, mehr debugging soon
        console.log(data.url)
        // @ts-ignore API und so
        const children = data[0].data.children[0].data

        console.log(children)

        await interaction.reply({
            embeds: [
                new Embed()
                    .setTitle(children.title)
                    .setImage(children.url)
                    .setFooter(`👍| ${children.ups} 💬| ${children.num_comments}`)
            ]
        })
    }

}