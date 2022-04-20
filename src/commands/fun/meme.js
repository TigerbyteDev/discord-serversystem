const subreddits = [
    "meme",
    "memes",
    "ich_iel",
    "marvelmemes",
];

module.exports = {
    name: "meme",
    description: "Ein zufälliges Meme von Reddit",
    options: [
        {
            name: "subreddit",
            type: "STRING",
            description: "Der Subreddit, in welchem zu suchen magst",
            required: false
        }
    ],
    ignore: false,

    run: async (interaction, client, tdhandler) => {
        const subreddit = await interaction.options.get("subreddit")?.value ?? subreddits[Math.floor(Math.random() * subreddits.length)]

        const req = await fetch(`https://www.reddit.com/r/${subreddit}/random/.json`)
            .then((res) => res.json());
        const { url, title } = req[0].data.children[0].data

        await interaction.reply({
            embeds: [
                await tdhandler.createEmbed("default")
                    .setTitle(title)
                    .setImage(url)
            ]
        })
    }
}