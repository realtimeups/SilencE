const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "firstmessage",
  aliases : ['f-msg'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const fetchMessages = await message.channel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const msg = fetchMessages.first();

    message.channel.send(
      new MessageEmbed()
        .setTitle(`${await client.translate('First Messsage in',message)} ${message.guild.name}`)
        .setURL(msg.url)
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${await client.translate("Content: ",message)}` + msg.content)
        .addField(`${await client.translate("Author",message)}`, msg.author, true)
        .addField(`${await client.translate('Message ID',message)}`, msg.id, true)
        .addField(`${await client.translate('Created At',message)}`, message.createdAt.toLocaleDateString(), true)
    );
  },
};