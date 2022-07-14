const Discord = require("discord.js")
const database = require("../database/func")

module.exports = async (client, interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId.startsWith(`lb_`)) {
            let nextPage = interaction.customId.split(`lb_`)[1]

            if (!isNaN(nextPage)) {
                nextPage = parseInt(nextPage)
                let leaderBoard = await database.getLeaderboard()

                if (!leaderBoard[0]) return message.reply(`:x: | Davet verisi bulunamıyor.`)

                let text = ""
                let i = 0
                await leaderBoard.forEach(async userData => {
                    let user = await client.users.cache.get(userData.userId)
                    i++
                    if (i >= (nextPage - 1) * 10 + 1 && i <= (nextPage * 10)) {
                        text += `#${i} | ${user} ---> \`${userData.invites} Davet\`\n`
                    }
                })

                let embed = new Discord.MessageEmbed()
                    .setAuthor({ name: `📋 Sunucu Davet Sıralaması`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setColor("AQUA")
                    .setDescription(text)
                    .setFooter({ text: `Sayfa ${nextPage} / ${i % 10 == 0 ? Math.floor(i / 10) : Math.floor((i / 10) + 1)}` })

                let firstControlButton = new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setCustomId(`lb_first`)
                    .setEmoji(`⏮`)

                let backControlButton = new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setCustomId(`lb_${nextPage - 1}`)
                    .setEmoji(`◀`)

                let nextControlButton = new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setCustomId(`lb_${nextPage + 1}`)
                    .setEmoji(`▶`)

                let lastControlButton = new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setCustomId(`lb_last`)
                    .setEmoji(`⏭`)

                if (nextPage == 1) {
                    firstControlButton.setDisabled(true)
                    backControlButton.setDisabled(true)
                }
                if (nextPage == (i % 10 == 0 ? Math.floor(i / 10) : Math.floor((i / 10) + 1))) {
                    nextControlButton.setDisabled(true)
                    lastControlButton.setDisabled(true)
                }

                let controlButtons = new Discord.MessageActionRow()
                    .setComponents([firstControlButton, backControlButton, nextControlButton, lastControlButton])

                interaction.reply({
                    embeds: [embed],
                    components: [controlButtons]
                })
            }
        }
    }
}