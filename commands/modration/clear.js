module.exports = {
    name : 'clear',
    aliases : ['purge'],
    run : async(client, message, args) => {
        if(!args[0]) return message.channel.send(`${await client.translate('Please specify a number of messages to delete ranging from 1 - 99',message)}`)
        if(isNaN(args[0])) return message.channel.send(`${await client.translate('Numbers are only allowed',message)}`)
        if(parseInt(args[0]) > 99) return message.channel.send(`${await client.translate('The max amount of messages that I can delete is 99',message)}`)
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err))
        message.channel.send(`${await client.translate('Deleted',message)}  + ${args[0]}  +  ${await client.translate('messages.',message)}`)
    }
}