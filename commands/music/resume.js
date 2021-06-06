module.exports = {
    name: 'resume',
    aliases: [],
    run: async(client, message) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - ${await client.translate(`You're not in a voice channel !`,message)}`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - ${await client.translate('You are not in the same voice channel !',message)}`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} -${await client.translate('No music currently playing !',message)} `);

        if (!client.player.getQueue(message).paused) return message.channel.send(`${client.emotes.error} - ${await client.translate('The music is already playing !',message)}`);

        const success = client.player.resume(message);

        if (success) message.channel.send(`${client.emotes.success} - ${await client.translate('Song',message)} ${client.player.getQueue(message).playing.title} ${await client.translate('resumed !',message)}`);
    }
}