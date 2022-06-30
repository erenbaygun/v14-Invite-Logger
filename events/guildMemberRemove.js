const userDB = require("../database/schemas/user")

module.exports = async (client, member) => {
    let inviteLogChannel = await member.guild.channels.cache.get(client.config.channels.inviteLog)


    let leaveText = client.config.text.leaveMessage.replace(`{member}`, `\`${member.user.tag}\``)
    await inviteLogChannel.send({ content: leaveText })

    client.logger.log(`${client.color.chalkcolor.red(`[-]`)} ${client.color.chalkcolor.magenta(`${member.user.tag}`)}, sunucudan ayrıldı.`)


    let userData = await userDB.findOne({ userId: member.id })
    if (userData.inviterId) {
        await userDB.findOneAndUpdate({ userId: userData.inviterId },
            {
                $inc: { invites: -1 }
            }
        )
    }

}