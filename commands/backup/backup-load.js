const backup = require('discord-backup');
module.exports = {
    name: "backup-load",
    aliases: ["bload"],
    category: "backup",
    
    run: async (client, message, args) => {
      if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(`:x: ${await client.translate('You need to have the manage messages permissions to create a backup in this server.',message)}`);
    }

    const backupID = args.join(' ');

    backup.fetch(backupID).then(() => {

        message.channel.send(`:warning: ${await client.translate('All the server channels, roles, and settings will be cleared. Do you want to continue? Send `-confirm` or `cancel`!',message)}`);

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && [`${await client.translate('-confirm',message)}`, `${await client.translate('cancel',message)}`].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === `${await client.translate('-confirm',message)}`;
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {

                    return message.author.send(`${await client.translate('Backup loaded successfully!',message)}`);
            
                }).catch((err) => {
            
                    if (err === 'No backup found')
                        return message.channel.send(`:x: ${await client.translate('No backup found for ID ',message)}`+backupID+'!');
                    else
                        return message.author.send(`:x:${await client.translate(' An error occurred: ',message)}`+(typeof err === 'string') ? err : JSON.stringify(err));
            
                });

            } else {
                return message.channel.send(`:x: ${await client.translate('Cancelled.',message)}`);
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send(`:x: ${await client.translate('Command timed out! Please retry.',message)}`);
        })

    }).catch(() => {
        return message.channel.send(`:x: ${await client.translate('No backup found for ID ',message)}`+backupID+'!');
    });

}
}