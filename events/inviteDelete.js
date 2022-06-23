const database = require("../database/func")

module.exports = async (client, invite) => {
    database.deleteOldInviteData(invite)
    client.logger.log(`${client.color.chalkcolor.red(`[-]`)} bir davet silindi - ${client.color.chalkcolor.blue(`discord.gg/${invite.code}`)}`)
}