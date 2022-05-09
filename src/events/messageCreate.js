const { db } = require("../index.js");
const { time } = require("@discordjs/builders");

module.exports = {
    name: "messageCreate",
    once: false,

    run: async message => {
        const client = tdhandler.getClient;
        if (message.author.id === client.user.id) return false;

        // Counting system
        if (message.channel.name === "zählen") {            
            const number = parseInt(message.content);
            if(isNaN(number)) return false;
            
            const current = await db.get("counting.current.count");
            const user = await db.get(`counting.current.user`);
            const rekord = db.get("counting.record.count");
            
            if (number === current + 1 && message.author.id !== user) {
                db.set("counting.current.count", number);
                db.set("counting.current.user", message.author.id);

                const emoji = number === 100 ? "💯" : rekord < current ? "🔥" : "✅";
                message.react(emoji);
                return true;
            }

            if (number !== current + 1 || message.author.id === user) {
                const grund = number !== current + 1 ? "den falschen Wert angegeben hat" : "bereits gezählt hat";
                message.react("❌");
                message.channel.send(`${message.author} hat bei **${current}** gefailt, weil er:sie ${grund}. \n Wir beginnen wieder bei **0**`);
                db.set("counting.current.count", 0);
                db.set("counting.current.user", null);

                if (rekord < current) {
                    db.set("counting.record.count", current);
                    db.set("counting.record.user", message.author.id);
                    message.channel.setTopic(`Der aktuelle Rekord **${current}** wurde ${time(new Date, "R")} aufgestellt!`);
                }

                return false;
            }
        }
    }
}
