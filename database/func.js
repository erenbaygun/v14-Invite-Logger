const userDB = require("./schemas/user")
const inviteDB = require("./schemas/invite");

module.exports.getUserInvites = async function (userId) {
    const userData = await userDB.findOne({ userId: userId })

    if (!userData) return null
    return userData.invites
}