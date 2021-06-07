const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : 'image',
    aliases : ['img'],
    run : async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.channel.send(`${await client.translate('Please enter a search query',message)}`)

        const results = await google.scrape(query, 1)
        message.channel.send(results[0].url);
    }
}