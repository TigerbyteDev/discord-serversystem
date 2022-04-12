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
    ignore: false,

    run: async (interaction) => {
        const subreddit = await getOption(interaction, "subreddit")?.value ?? subreddits[Math.floor(Math.random() * subreddits.length)]

        const req = await fetch("https://www.reddit.com/r/memes/random/.json")
            .then((res) => res.json());
        const { url, title, ups, permaLink } = req[0].data.children[0].data

        await interaction.reply({
            embeds: [
                new Embed()
                    .setTitle(title)
                    .setURL(`https://www.reddit.com${permaLink}`)
                    .setImage(url)
                    .setFooter(`👍 ${ups} Likes`)
            ]
        })
    }

}