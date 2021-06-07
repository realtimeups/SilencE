const discord = require("discord.js");
const figlet = require("figlet"); // MAKE SURE TO INSTALL FIGLET PACKAGE OR CODE WONT WORK

module.exports = {
    name: "ascii",
    aliases: [],
    run: async (client, message, args) => {

   let text = args.join(" ");
   if(!text) {
return message.channel.send(`${await client.translate('Please provide text for the ascii conversion!',message)}`)
}
   let maxlen = 20
if(text.length > 20) {
return message.channel.send(`${await client.translate(`Please put text that has 20 characters or less because the conversion won't be good!`,message)}`)
}
 // AGAIN, MAKE SURE TO INSTALL FIGLET PACKAGE!  
figlet(text, function(err, data) {
message.channel.send(data, {
code: 'AsciiArt' 
});
})

    }
};