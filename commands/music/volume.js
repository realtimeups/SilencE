module.exports = {
    name: 'volume',
    aliases: [],
    run: async(client, message) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - ${await client.translate(`You're not in a voice channel !`,message)}`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - ${await client.translate('You are not in the same voice channel !',message)}`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} -${await client.translate('No music currently playing !',message)} `);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`${client.emotes.error} -${await client.translate('Please enter a valid number !',message)} `);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`${client.emotes.error} - ${await client.translate('Please enter a valid number (between 1 and 100) !',message)}`);

        const success = client.player.setVolume(message, parseInt(args[0]));

        if (success) message.channel.send(`${client.emotes.success} - ${await client.translate('Volume set to',message)} **${parseInt(args[0])}%** !`);
    }
}