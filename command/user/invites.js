const Discord = require("discord.js")
const userDB = require("../../database/schemas/user")
const database = require("../../database/func")

module.exports = {
    name: 'invites',
    aliases: ['davetler'],
    dir: "user",
    permissions: [],

    run: async (client, message, args) => {
        let user;
        if (!args[0]) user = message.author
        else user = await message.mentions.users.first() || await message.guild.members.cache.get(args[0])?.user
        if (!user) return message.reply(`:x: | Geçerli bir kullanıcı belirtmelisin.`)


        let userData = await userDB.findOne({ userId: user.id })
        if (!userData) return message.reply(`Bu kullanıcıya ait davet verisi bulunmuyor.`)
        let leaderboard = await database.getLeaderboard()
        let i = 1
        let rank
        await leaderboard.forEach(data => {
            if (data.userId != user.id) i++;
            else rank = i
        })

        let embed = new Discord.MessageEmbed()
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .setColor("AQUA")
            .addField('Davet Sayısı:', `${userData.invites}`, true)
            .addField('Sıralama:', `#${rank}`, true)

        message.reply({ embeds: [embed] })
    }
}