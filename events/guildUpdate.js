const inviteDB = require("../database/schemas/invite")

module.exports = async (client, oldGuild, newGuild) => {
    if (oldGuild.vanityURLCode !== newVanity.vanityURLCode) {
        await inviteDB.findOneAndUpdate({ guildId: newGuild.id },
            {
                $set: {
                    vanity: {
                        code: newVanity.code,
                        uses: vanity.uses
                    }
                }
            }
        )
    }
}