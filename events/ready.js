const mongoose = require("mongoose");
const inviteDB = require("../database/schemas/invite")
const database = require("../database/func")

module.exports = async (client) => {
    client.logger.info(`[!] ${client.user.username} başlatılıyor...`)
    client.logger.info(`[!] Bot ${client.commandes.size} komuta sahip`)
    client.logger.info(`[!] Botu ekle: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`)
    client.user.setActivity(client.config.bot.status, { type: 'PLAYING' })

    mongoose.connect(client.config.mongoURL, {
        keepAlive: true
    }).then(() => {
        client.logger.database(`Mongoose veri tabanına bağlandı.`)
    })

    const guild = await client.guilds.cache.find(guild => guild.id == client.config.guildId)
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
    client.logger.database(`${client.color.chalkcolor.magenta(`${guild.name}`)} sunucusundan, ${guildInvites.size} davet verisi kaydedildi.`)
}
