const Discord = require("discord.js")
const userDB = require("../../database/schemas/user")
const database = require("../../database/func")

module.exports = {
    name: 'reset',
    aliases: ['resetInvites'],
    dir: "admin",
    permissions: ["ManageGuild"],

    run: async (client, message, args) => {
        let user;
        if (!args[0]) return message.reply(`:x: | Geçerli bir kullanıcı belirtmelisin.`)
        else user = await message.mentions.users.first() || await message.guild.members.cache.get(args[0])?.user
        if (!user) return message.reply(`:x: | Geçerli bir kullanıcı belirtmelisin.`)
        if (user.bot) return message.reply(`:x: | Bu komutu botlar üzerinde kullanamazsın.`)


        let userData = await userDB.findOne({ userId: user.id })
        if (!userData) return message.reply(`:x: | Bu kullanıcıya ait davet verisi bulunmuyor.`)

        await userDB.findOneAndUpdate({ userId: user.id },
            {
                $set: { invites: 0 }
            }
        )

        let leaderboard = await database.getLeaderboard()
        let i = 1
        let rank
        await leaderboard.forEach(data => {
            if (data.userId != user.id) i++;
            else rank = i
        })

        let activeUserInvites = await database.getActiveUserInvites(user.id, message.guild)
        let activeInviteText = "";

        if (!activeUserInvites[0]) activeInviteText = `Aktif davet verisi bulunmuyor.`
        else activeUserInvites.forEach(invite => {
            activeInviteText += `- gg/${invite.code}  --->  **${invite.uses}** kullanım\n`
        })

        let embed = new Discord.EmbedBuilder()
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
            .setColor("Aqua")
            .addFields([
                { name: 'Sıralama:', value: `#${rank}`, inline: true },
                { name: 'Davet sayısı:', value: `0`, inline: true },
                { name: 'Aktif davetler:', value: `${activeInviteText}` }
            ])
            .setTimestamp()

        message.reply({ content: `**Kullanıcının davet sayısı sıfırlandı.**`, embeds: [embed] })
    }
}