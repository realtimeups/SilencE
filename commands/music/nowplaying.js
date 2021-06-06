module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    run: async(client, message) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - ${await client.translate(`You're not in a voice channel !`,message)}`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - ${await client.translate('You are not in the same voice channel !',message)}`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} -${await client.translate('No music currently playing !',message)} `);

        const track = client.player.nowPlaying(message);
        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: 'RED',
                author: { name: track.title },
                fields: [
                    { name: `${await client.translate('Channel',message)}`, value: track.author, inline: true },
                    { name: `${await client.translate('Requested by',message)}`, value: track.requestedBy.username, inline: true },
                    { name: `${await client.translate('From playlist',message)}`, value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                    { name: `${await client.translate('Views',message)}`, value: track.views, inline: true },
                    { name: `${await client.translate('Duration',message)}`, value: track.duration, inline: true },
                    { name: `${await client.translate('Filters activated',message)}`, value: filters.length + '/' + client.filters.length, inline: true },

                    { name: `${await client.translate('Volume',message)}`, value: client.player.getQueue(message).volume, inline: true },
                    { name: `${await client.translate('Repeat mode',message)}`, value: client.player.getQueue(message).repeatMode ? 'Yes' : 'No', inline: true },
                    { name: `${await client.translate('Currently paused',message)}`, value: client.player.getQueue(message).paused ? 'Yes' : 'No', inline: true },
                    { name: `${await client.translate('Progress bar',message)}`, value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    }
}