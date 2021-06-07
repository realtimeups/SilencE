module.exports = {
    name: 'search',
    aliases: ['sr'],
    run: async(client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - ${await client.translate(`You're not in a voice channel !`,message)}`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - ${await client.translate('You are not in the same voice channel !',message)}`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} -${await client.translate('Please indicate the title of a song !',message)} `);

        client.player.play(message, args.join(" "));
    }
}