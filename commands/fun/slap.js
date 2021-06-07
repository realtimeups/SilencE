const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
  name: "slap",
  aliases: ["batmanslap", "slp"],
  run: async (client, message, args) => {
    
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!Member) return message.channel.send(`${await client.translate("Please Mention Or Give ID Of A Member!",message)}`);
   
    const Other = args.slice(1).join(" ") || `${await client.translate("Don't Be Gay",message)}`;
    if (Other.length > 50) return message.channel.send(`${await client.translate("Characters Limit Reached - 50!",message)}`);

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setImage(encodeURI(`https://vacefron.nl/api/batmanslap?text1=bruh&text2=${Other}&batman=${message.author.avatarURL({ format: "png" })}&robin=${Member.user.displayAvatarURL({ format: "png" })}`))
    .setTimestamp();

    return message.channel.send(Embed);
  }
};