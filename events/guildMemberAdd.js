const database = require("../database/func")
const inviteDB = require("../database/schemas/invite");
const userDB = require("../database/schemas/user");

module.exports = async (client, member) => {
    if (!member.guild.available || member.user.bot || member.guild.id !== client.config.serverId) return;

    let inviteData = await inviteDB.findOne({ guildId: member.guild.id })
    let newGuildInvites = await member.guild.invites.fetch()

    let usedInvite
    await newGuildInvites.forEach(invite => {
        if (invite.uses > inviteData.invites.find(i => i.code == invite.code).uses) {
            usedInvite = invite
        }
    })
    if (!usedInvite) {
        await database.loadUserData(member.guild)
        await database.resetGuildInvitesData(member.guild)

        let inviteLogChannel = await member.guild.channels.cache.get(client.config.channels.inviteLog)

        let joinText = client.config.text.vaintyJoinMessage.replace(`{newMember}`, member)
        await inviteLogChannel.send({ content: joinText })

        client.logger.log(`${client.color.chalkcolor.green(`[+]`)} ${client.color.chalkcolor.magenta(`${member.user.tag}`)}, sunucuya katıldı - Özel url'yi kullanarak katıldı`)
    } else {

        let inviter = client.users.cache.get(usedInvite.inviter.id)

        await database.resetGuildInvitesData(member.guild)

        await userDB.findOneAndUpdate({ userId: member.id },
            {
                userId: member.id,
                invites: 0,
                inviterId: usedInvite.inviter.id
            },
            { upsert: true }
        )

        await userDB.findOneAndUpdate({ userId: usedInvite.inviter.id },
            {
                userId: usedInvite.inviter.id,
                $inc: {
                    invites: 1
                }
            },
            { upsert: true }
        )

        let inviteLogChannel = await member.guild.channels.cache.get(client.config.channels.inviteLog)


        let joinText = client.config.text.joinMessage.replace(`{newMember}`, member).replace(`{inviter}`, `\`${inviter.tag}\``).replace(`{inviteCount}`, usedInvite.uses)
        await inviteLogChannel.send({ content: joinText })

        client.logger.log(`${client.color.chalkcolor.green(`[+]`)} ${client.color.chalkcolor.magenta(`${member.user.tag}`)}, sunucuya katıldı - Davet eden: ${client.color.chalkcolor.blue(`${inviter.tag}`)}`)
    }
};
