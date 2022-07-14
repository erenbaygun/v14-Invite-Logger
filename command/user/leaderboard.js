const Discord = require("discord.js")
const database = require("../../database/func")

module.exports = {
    name: 'leaderboard',
    aliases: ['top', 'lb', 'ranks'],
    dir: "user",
    permissions: [],

    run: async (client, message, args) => {
        let leaderBoard = await database.getLeaderboard()

        if (!leaderBoard[0]) return message.reply(`:x: | Davet verisi bulunamıyor.`)

        let text = ""
        let i = 0
        await leaderBoard.forEach(async userData => {
            let user = await client.users.cache.get(userData.userId)
            i++
            if (i <= 10) {
                text += `#${i} | ${user} ---> \`${userData.invites} Davet\`\n`
            }
        })

        let embed = new Discord.MessageEmbed()
            .setAuthor({ name: `📋 Sunucu Davet Sıralaması`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setColor("AQUA")
            .setDescription(text)
            .setFooter({ text: `Sayfa 1 / ${i % 10 == 0 ? Math.floor(i / 10) : Math.floor((i / 10) + 1)}` })

        if (Math.floor((i / 10) + 1) === 1) {
            message.reply({ embeds: [embed] })
        } else {
            message.reply({
                embeds: [embed],
                components: [
                    new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setStyle("PRIMARY")
                                .setCustomId(`lb_first`)
                                .setEmoji(`⏮`)
                                .setDisabled(true)
                        )
                        .addComponents(
                            new Discord.MessageButton()
                                .setStyle("PRIMARY")
                                .setCustomId(`lb_0`)
                                .setEmoji(`◀`)
                                .setDisabled(true)
                        )
                        .addComponents(
                            new Discord.MessageButton()
                                .setStyle("PRIMARY")
                                .setCustomId(`lb_2`)
                                .setEmoji(`▶`)
                        )
                        .addComponents(
                            new Discord.MessageButton()
                                .setStyle("PRIMARY")
                                .setCustomId(`lb_last`)
                                .setEmoji(`⏭`)
                        )
                ]
            })
        }
    }
}