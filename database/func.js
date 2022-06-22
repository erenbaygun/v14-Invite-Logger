const userDB = require("./schemas/user")
const inviteDB = require("./schemas/invite");

module.exports.getUserCodes = async function (userId) {
    const userData = await userDB.findOne({ userId: userId })

    if (!userData) return []
    return userData.codes
}