const toxicity = require('@tensorflow-models/toxicity');

module.exports = {
    name: "messageCreate",
    once: false,

    run: async message => {
        const client = tdhandler.getClient;
        if (message.author.id === client.user.id) return false;

        async function toxicCheck() {
            const model = await toxicity.load(0.6, ["identity_attack", "insult", "obscene", "severe_toxicity", "sexual_explicit", "threat", "toxicity"]);
            const predictions = await model.classify(message.content);
            console.log(predictions);
            for (const e of predictions) {
                if (e.results[0].match) {
                    await message.reply({
                        content: `Deine Nachricht wird gelöscht, weil sie ein Toxic-level von **${
                            e.results[0].match ? Math.round(e.results[0].probabilities[1] * 100) : Math.round(e.results[0].probabilities[0] * 100)
                        }%** hat.`
                    });
                    message.delete();
                    tdhandler.log(`${message.author.tag} hat eine Nachricht gesendet mit einem Toxic-level von **${
                        e.results[0].match ? Math.round(e.results[0].probabilities[1] * 100) : Math.round(e.results[0].probabilities[0] * 100)
                    }%**.`);
                    break;
                }
            }
        }
    }
}