
const db = require("quick.db");
const config = require('../config.json')
module.exports.run = async(client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = config.default_prefix || `<@${client.user.id}>`;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    
    let command = client.commands.get(cmd);
    
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command.inVoiceChannel && !message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    const permission = command.authorPermission
    if(!message.member.hasPermission(permission)) {
        return message.reply("You need to have `" + permission + "` to use this command!")
    }

    if(command.devOnly) {
        if(!devs.includes(message.author.id)) {
            return message.reply("Only the bot devs may use this cmd!")
        }
    }
    
    if (command) 
        command.run(client, message, args);
}