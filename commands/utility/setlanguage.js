const  db = require('quick.db');

module.exports = {
    name: 'set-lang',
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        const lang = args[0];
        if(!lang) return message.channel.send('>>> <a:error:850854622284480554>Please Specify A Message');
        await db.set(`lang-${message.guild.id}`, lang);
        message.channel.send('>>> <a:check:850853992090173460> Language has been set to ' + `**${lang}**`);
    }
}