module.exports = {
    name: 'queue',
    aliases: [],
    run: async(client, message) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - ${await client.translate(`You're not in a voice channel !`,message)}`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - ${await client.translate('You are not in the same voice channel !',message)}`);

        const queue = client.player.getQueue(message);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} -${await client.translate('No songs currently playing !',message)} `);

        message.channel.send(`**${await client.translate('Server queue',message)} - ${message.guild.name} ${client.emotes.queue} ${client.player.getQueue(message).loopMode ? `${await client.translate('(looped)',message)}` : ''}**\n${await client.translate('Current',message)} : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
            return `**#${i + 1}** - ${track.title} | ${track.author} (${await client.translate('requested by',message)} : ${track.requestedBy.username})`
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `${await client.translate('And',message)} **${queue.tracks.length - 5}** ${await client.translate('other songs...',message)}` : `${await client.translate('In the playlist',message)} **${queue.tracks.length}** ${await client.translate('song(s)...',message)}`}`));
    }
}