const Discord = require("discord.js");
const { parse } = require("twemoji-parser");


module.exports = {
  name: "emojiadd",
    async execute(bot, message, args) {
    const emoji = args[0];
    if (!emoji) return message.channel.send(`${await client.translate("Please Give Me A Emoji!",message)}`);

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");

      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
      );
      const Added = BaseEmbed(message)
        .setTitle(`${await client.translate("Emoji Added",message)}`)
        .setColor("BLUE")
        .setDescription(
          `${await client.translate('Emoji Has Been Added! | Name :',message)} ${
            name || `${customemoji.name}`
          } | ${await client.translate('Preview :',message)} [${await client.translate(`Click Me`,message)}](${Link})`
        );
      return message.channel.send(Added);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send(`${await client.translate("Please Give Me A Valid Emoji!",message)}`);
      message.channel.send(`${await client.translate("You Can Use Normal Emoji Without Adding In Server!",message)}`
        
      );
    }
  },
};