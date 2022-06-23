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

    database.resetGuildInvitesData(member.guild)

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
};
