const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    aliases : ['dooz','ttt'],
    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send(`${await client.translate('Please specify a member',message)}`)
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}