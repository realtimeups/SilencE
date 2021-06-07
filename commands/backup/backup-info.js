const Discord = require('discord.js');
const backup = require('discord-backup');


module.exports = {
    name: 'info-backup',
    aliases: [],
    
    

   run: async (client, message, args) => {
    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.reply(`:x: ${await client.translate('You need to have the administrator permissions to create a backup in this server.',message)}`);
    }

    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send(`:x: ${await client.translate('Please specify a valid backup ID!',message)}`);

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.MessageEmbed()
            .setAuthor(`:information_source: ${await client.translate('Backup',message)}`, backup.data.iconURL)
            .addField(`${await client.translate('Server name',message)}`, backup.data.name)
            .addField(`${await client.translate('Size',message)}`, backup.size + ' kb')
            .addField(`${await client.translate('Created at',message)}`, formattedDate)
            .setFooter(`${await client.translate('Backup ID: ',message)}`+backup.id);

        return message.channel.send(embed);

    }).catch((err) => {

        if (err === 'No backup found')
            return message.channel.send(`:x: ${await client.translate('No backup found for ID ',message)}`+backupID+'!');
        else
            return message.channel.send(`:x: ${await client.translate('An error occurred: ',message)}`+(typeof err === 'string') ? err : JSON.stringify(err));

    });

  }
}