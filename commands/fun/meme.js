const Discord = require('discord.js')
const randompuppy = require('random-puppy')
module.exports = {
    name: "meme",
    description: "Returns random meme",
    usage: "s!meme",
    run: async(client, message) => {
        const meme = ["meme", "dankmeme", "discordmeme"]
        const random = meme[Math.floor(Math.random() * meme.length)] //this returns any random string from the array meme

        const image = await randompuppy(random)
        let embed = new Discord.MessageEmbed()
        .setTitle("Meme")
        .setImage(`${image}`)
        .setTimestamp()
        await message.channel.send(embed)
        
    }
}