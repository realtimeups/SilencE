module.exports = {
    name: 'w-filters',
    aliases: ['filters'],
    run: async(client, message) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} -${await client.translate(`You're not in a voice channel !`,message)} `);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - ${await client.translate('You are not in the same voice channel !',message)}`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - ${await client.translate('No music currently playing !',message)}`);

        const filtersStatuses = [[], []];

        client.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (client.player.getQueue(message).filters[filterName] ? client.emotes.success : client.emotes.off));
        });

        message.channel.send({
            embed: {
                color: 'ORANGE',
                fields: [
                    { name: `${await client.translate('Filters',message)}`, value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description: `${await client.translate('List of all filters enabled or disabled.',message)}\n${await client.translate('Use',message)} \`${client.config.discord.prefix}${await client.translate('filters',message)}\` ${await client.translate('to add a filter to a song.',message)}`,
            },
        });
    }
}