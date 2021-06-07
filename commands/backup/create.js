const backup = require('discord-backup');
module.exports = {
    name: "backup-create",
    aliases: ["bc"],
    run: async (client, message, args) => {
      if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(`:x: ${await client.translate('You need to have the manage messages permissions to create a backup in this server.',message)}`);
    }

    backup.create(message.guild).then((backupData) => {

        return message.channel.send(`${await client.translate('Backup created! Here is your ID:',message)}` +' `'+backupData.id+'`' +`${await client.translate('Use qload-backup ',message)}`+'`'+backupData.id+'`'+`${await client.translate(' to load the backup on another server!',message)}`);

    }).catch(() => {

        return message.channel.send(`:x: ${await client.translate('An error occurred, please report to the Support server ',message)}`);

    });

}
}