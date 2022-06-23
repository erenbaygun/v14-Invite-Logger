const database = require("../database/func")

module.exports = async (client, invite) => {
    database.pushNewInviteData(invite)
    client.logger.log(`${client.color.chalkcolor.green(`[+]`)} ${client.color.chalkcolor.magenta(`${invite.inviter.tag} - ${invite.inviter.id}`)}, yeni davet oluşturdu - ${client.color.chalkcolor.blue(`discord.gg/${invite.code}`)}`)
}