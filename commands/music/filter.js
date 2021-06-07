module.exports = {
    name: 'filter',
    aliases: [],
    run: async(client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - ${await client.translate(`You're not in a voice channel !`,message)}`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - ${await client.translate('You are not in the same voice channel !',message)}`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} -${await client.translate('No music currently playing !',message)} `);

        if (!args[0]) return message.channel.send(`${client.emotes.error} - ${await client.translate('Please specify a valid filter to enable or disable !',message)}`);

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return message.channel.send(`${client.emotes.error} - ${await client.translate(`This filter doesn't exist, try for example (8D, vibrato, pulsator...) !`,message)}`);

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`${client.emotes.music} - ${await client.translate(`I'm **adding** the filter to the music, please wait... Note : the longer the music is, the longer this will take.`,message)}`);
        else message.channel.send(`${client.emotes.music} -${await client.translate(`I'm **disabling** the filter on the music, please wait... Note : the longer the music is playing, the longer this will take.`,message)} `);
    }
}