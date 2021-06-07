const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "resetnick",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) return message.reply(`${await client.translate('Please specify a member!',message)}`);

    try {
      member.setNickname(null);
    } catch (err) {
      message.reply(`
      ${await client.translate('I do not have permission to reset',message)} ${member.toString()} ${await client.translate('nickname!',message)}`
      );
    }
  },
};