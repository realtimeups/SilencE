module.exports = {
    name: 'clear-queue',
    aliases: ['cq'],

    run: async(client, message) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - ${await client.translate(`You're not in a voice channel !`,message)}`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - ${await client.translate('You are not in the same voice channel !',message)}`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} -${await client.translate('No music currently playing !',message)} `);

        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`${client.emotes.error} - ${await client.translate('There is only one song in the queue.',message)}`);

        client.player.clearQueue(message);

        message.channel.send(`${client.emotes.success} - ${await client.translate('The queue has just been **removed** !',message)}`);
    }
}