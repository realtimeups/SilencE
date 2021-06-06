const Discord = require('discord.js')
const {default_prefix} = require('../../config.json');
const db = require('quick.db')
module.exports = {
    name: "set-prefix",
    description: "To Set Bot Prefix",
    usage: "s!set-prefix",
    run: async(client, message,args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(`${await client.translate('You are not allowed or do not have permission to change prefix',message)}`)
          }
            if(!args[0]) {
                return message.channel.send(`${await client.translate('Please give the prefix that you want to set',message)}`)
            }
                if(args[1]) {
                    return message.channel.send(`${await client.translate('You can not set prefix a double argument',message)}`)
                }
                    if(args.join("") === default_prefix) {
                        db.delete(`prefix_${message.guild.id}`)
                            return await message.channel.send(`${await client.translate('Prefix Has Been Reseted ✅',message)}`)
                    }
                        db.set(`prefix_${message.guild.id}`, args[0])
                        await message.channel.send(`${await client.translate('Seted Bot Prefix to ',message)}${args[0]}`)
        
    }
}