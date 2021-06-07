const { Message } = require('discord.js')

module.exports = {
    name : 'removerole',
    aliases : ['r-role'],
    run : async(client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`${await client.translate('You do not have permission.',message)}`)
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send(`${await client.translate('No member specified',message)}`) //when no member is pinged
        const role = message.mentions.roles.first() // roles = mentions
        if(!role) return message.channel.send(`${await client.translate('No role specified',message)}`) //when no role is specified or pinged
        //now the code!
        await target.roles.remove(role) // removeing the role to the user
        message.channel.send(`${target.user.username} ${await client.translate('roles has been removed',message)}`) //this is optional and editable
    }
}