const mongoose = require("mongoose");

module.exports = async (client) => {
    client.logger.info(`[!] ${client.user.username} is now started...`)
    client.logger.info(`[!] The bot have ${client.commandes.size} commands`)
    client.user.setActivity(client.config.bot.status, { type: 'PLAYING' })

    mongoose.connect(client.config.mongoURL, {
        keepAlive: true
    }).then(() => {
        client.logger.database(`Connected to mongoose database.`)
    })
};