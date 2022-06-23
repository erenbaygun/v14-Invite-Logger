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
        vanity: {
            code: guild.vanityURLCode,
            uses: guild.vanityURLUses
        }
    }, { upsert: true });


    await inviteDB.findOneAndUpdate({ guildId: guild.id }, { $set: { invites: [] } })
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