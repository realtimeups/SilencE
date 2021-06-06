module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    run: async(client, message) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - ${await client.translate(`You're not in a voice channel !`,message)}`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} -${await client.translate('You are not in the same voice channel !',message)} `);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} -${await client.translate('No music currently playing !',message)} `);

        const success = client.player.shuffle(message);

        if (success) message.channel.send(`${client.emotes.success} - Queue shuffled **${client.player.getQueue(message).tracks.length}** ${await client.translate('song(s) !',message)}`);
    }
}