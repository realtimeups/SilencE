module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    run: async(client, message) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} -${await client.translate(`You're not in a voice channel !`,message)} `);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} -${await client.translate('You are not in the same voice channel !',message)} `);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - ${await client.translate('No music currently playing !',message)}`);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(`${client.emotes.success} - ${await client.translate('Repeat mode **disabled** !',message)}`);
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(`${client.emotes.success} -${await client.translate('Repeat mode **enabled** the whole queue will be repeated endlessly !',message)} `);
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(`${client.emotes.success} - ${await client.translate('Repeat mode **disabled** !',message)}`);
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(`${client.emotes.success} - ${await client.translate('Repeat mode **enabled** the current music will be repeated endlessly !',message)}`);
            };
        };
    }
}