const userDB = require("./schemas/user")
const inviteDB = require("./schemas/invite");

module.exports.getUserInvites = async function (userId) {
    const userData = await userDB.findOne({ userId: userId })

    if (!userData) return null
    return userData.invites
}

module.exports.resetGuildInvitesData = async function (guild) {
    const guildInvites = await guild.invites.fetch()

    await inviteDB.findOneAndUpdate({ guildId: guild.id }, {
        guildId: guild.id,
    }, { upsert: true });


    await inviteDB.findOneAndUpdate({ guildId: guild.id }, {
        $set: {
            invites: [],
            vanity: {
                code: guild.vanityURLCode,
                uses: guild.vanityURLUses
            }
        }
    })

    await guildInvites.forEach(async invite => {
        await inviteDB.findOneAndUpdate({ guildId: guild.id },
            {
                $push: {
                    invites: {
                        code: invite.code,
                        inviterId: invite.inviterId,
                        uses: invite.uses
                    }
                }
            }
        )
    });

    client.logger.database(`${guildInvites.size} davet verisi güncellendi.`)
}

module.exports.pushNewInviteData = async function (invite) {
    await inviteDB.findOneAndUpdate({ guildId: invite.guild.id },
        {
            $push: {
                invites: {
                    code: invite.code,
                    inviterId: invite.inviterId,
                    uses: invite.uses
                }
            }
        }
    )
}

module.exports.deleteOldInviteData = async function (invite) {
    await inviteDB.findOneAndUpdate({ guildId: invite.guild.id },
        {
            $pull: {
                invites: { code: invite.code }
            }
        }
    )
}

module.exports.getLeaderboard = async function () {
    return await userDB.find().sort({ invites: -1 })
}

module.exports.getActiveUserInvites = async function (userId, guild) {
    const guildInvites = await guild.invites.fetch()

    let activeInvites = [];
    await guildInvites.forEach(async invite => {
        if (invite.inviter.id == userId) activeInvites.push({ code: invite.code, uses: invite.uses })
    });

    return activeInvites
}

module.exports.loadUserData = async function (guild) {
    await guild.members.cache.forEach(async member => {
        if (!member.user.bot) {
            let check = await userDB.findOne({ userId: member.id })
            if (!check) {
                await new userDB(
                    {
                        userId: member.id,
                        invites: 0
                    }
                ).save()
            }
        }
    })
}