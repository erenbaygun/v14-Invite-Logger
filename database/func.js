const userDB = require("./schemas/user")

module.exports.getInvites = async function (userID) {
    const userData = await userDB.findOne({ userID: userID })
    if (!userData) {
        userData = await new userDB({
            userID: userID,
            invites: []
        }).save()
    }
    return userData.invites
}