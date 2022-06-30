const database = require("../database/func")

module.exports = async (client, invite) => {
    await database.deleteOldInviteData(invite)
    client.logger.log(`${client.color.chalkcolor.red(`[-]`)} Bir davet silindi - ${client.color.chalkcolor.blue(`discord.gg/${invite.code}`)}`)
}