const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "nick",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) return message.reply(`${await client.translate("Please specify a member!",message)}`);

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply(`${await client.translate("Please specify a nickname!",message)}`);

    try {
      member.setNickname(arguments);
    } catch (err) {
      console.log(err);
      message.reply(`
      ${await client.translate('I do not have permission to set',message)} ${member.toString()} ${await client.translate('nickname!',message)}`
      );
    }
  },
};