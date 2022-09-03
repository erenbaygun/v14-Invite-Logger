const inviteDB = require("../database/schemas/invite")

module.exports = async (client, oldGuild, newGuild) => {
    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
        await inviteDB.findOneAndUpdate({ guildId: newGuild.id },
            {
                $set: {
                    vanity: {
                        code: newGuild.vanityURLCode,
                        uses: newGuild.vanityURLUses
                    }
                }
            }
        )
    }
}