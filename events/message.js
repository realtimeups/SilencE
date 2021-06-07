
const db = require("quick.db");
const { Collection } = require('discord.js');
const config = require('../config.json')
module.exports.run = async(client, message) => {
    if (message.author.bot) return;
    if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`${await client.translate('Your afk status have been removed',message)} (${info})`)
    }
    //checking for mentions
    if(message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(message.mentions.members.first().user.tag + ":" + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
        }else return;
    }else;
    if (!message.guild) return;
    let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = config.default_prefix || `<@${client.user.id}>`;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    
    let command = client.commands.get(cmd);
    const Timeout = new Collection();
    
    if (command) {
        if(command.timeout) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`${await client.translate('You are on a',message)} \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` ${await client.translate('cooldown.',message)}`)
            command.run(client, message, args)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.timeout)
        }
    }
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command.inVoiceChannel && !message.member.voice.channel) return message.channel.send(`${client.emotes.error} | ${await client.translate('You must be in a voice channel!',message)}`)
    const permission = command.authorPermission
    if(!message.member.hasPermission(permission)) {
        return message.reply(`${await client.translate("You need to have",message)}` + permission + `${await client.translate(" to use this command!",message)}`)
    }

    if(command.devOnly) {
        if(!devs.includes(message.author.id)) {
            return message.reply(`${await client.translate("Only the bot devs may use this cmd!",message)}`)
        }
    }
    
    if (command) 
        command.run(client, message, args);
}