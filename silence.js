const { Client, Collection } = require("discord.js");
const translate = require('@iamtraction/google-translate');
const db = require('quick.db');
const fs = require('fs');
const client = new Client({
    disableEveryone: true
})
const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;


const Config = require('./config.json')
client.config;
client.emotes = Config.emoji
// Collections
client.commands = new Collection();
client.aliases = new Collection();


["command","event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
//player
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};
client.translate = async(text,message) => {
    const lang = await db.has(`lang-${message.guild.id}`) ? await db.get(`lang-${message.guild.id}`) : 'en';
    const traslated = await translate(text, {from: 'en', to: lang});
    return traslated.text;
}

client.login("ODUwODA1NDc1OTkzMzIxNDkz.YLvEWA.Q0B5MWhrzebJsoqa2KzxRkifk1U");