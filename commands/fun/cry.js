const discord = require("discord.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: "cry",
  
  run: async (client, message, args) => {
    
    let data = await random.getAnimeImgURL("cry");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("RANDOM")
    .setFooter(`${await client.translate('Please talk with',message)} ${message.author.username} ${await client.translate('they are crying',message)}`)
    .setTimestamp()
    
    message.channel.send(embed);
  }
};