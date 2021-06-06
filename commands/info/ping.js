const Discord = require('discord.js')

module.exports = {
    name: "ping",
    aliases: ["latency"],
    description: "Returns teh bot's ping!",
    usage: "!ping",
    run: async(client, message) => {
        const msg = await message.channel.send(`${await client.translate('🏓 Pinging...',message)}`)
        const embed = new Discord.MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`${await client.translate('WebSocket ping is',message)} ${client.ws.ping}MS\n ${await client.translate('Message edit ping is',message)} ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
            await message.channel.send(embed)
            msg.delete()
        
    }
}