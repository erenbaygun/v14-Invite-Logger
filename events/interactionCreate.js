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

                interaction.update({
                    embeds: [embed],
                    components: [controlButtons]
                })
            } else {
                if (nextPage == 'last') {
                    let leaderBoard = await database.getLeaderboard()

                    if (!leaderBoard[0]) return message.reply(`:x: | Davet verisi bulunamıyor.`)

                    let lastPage = leaderBoard.length % 10 == 0 ? Math.floor(leaderBoard.length / 10) : Math.floor((leaderBoard.length / 10) + 1)

                    let text = ""
                    let i = 0
                    await leaderBoard.forEach(async userData => {
                        let user = await client.users.cache.get(userData.userId)
                        i++
                        if (i >= (lastPage - 1) * 10 + 1 && i <= (lastPage * 10)) {
                            text += `#${i} | ${user} ---> \`${userData.invites} Davet\`\n`
                        }
                    })

                    let embed = new Discord.MessageEmbed()
                        .setAuthor({ name: `📋 Sunucu Davet Sıralaması`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setColor("AQUA")
                        .setDescription(text)
                        .setFooter({ text: `Sayfa ${lastPage} / ${lastPage}` })

                    let firstControlButton = new Discord.MessageButton()
                        .setStyle("PRIMARY")
                        .setCustomId(`lb_first`)
                        .setEmoji(`⏮`)

                    let backControlButton = new Discord.MessageButton()
                        .setStyle("PRIMARY")
                        .setCustomId(`lb_${lastPage - 1}`)
                        .setEmoji(`◀`)

                    let nextControlButton = new Discord.MessageButton()
                        .setStyle("PRIMARY")
                        .setCustomId(`lb_${lastPage + 1}`)
                        .setEmoji(`▶`)
                        .setDisabled(true)

                    let lastControlButton = new Discord.MessageButton()
                        .setStyle("PRIMARY")
                        .setCustomId(`lb_last`)
                        .setEmoji(`⏭`)
                        .setDisabled(true)

                    if (lastPage == 1) {
                        firstControlButton.setDisabled(true)
                        backControlButton.setDisabled(true)
                    }

                    let controlButtons = new Discord.MessageActionRow()
                        .setComponents([firstControlButton, backControlButton, nextControlButton, lastControlButton])

                    interaction.update({
                        embeds: [embed],
                        components: [controlButtons]
                    })
                }
                else if (nextPage == 'first') {
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
                        .setAuthor({ name: `📋 Sunucu Davet Sıralaması`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setColor("AQUA")
                        .setDescription(text)
                        .setFooter({ text: `Sayfa 1 / ${i % 10 == 0 ? Math.floor(i / 10) : Math.floor((i / 10) + 1)}` })

                    let firstControlButton = new Discord.MessageButton()
                        .setStyle("PRIMARY")
                        .setCustomId(`lb_first`)
                        .setEmoji(`⏮`)
                        .setDisabled(true)

                    let backControlButton = new Discord.MessageButton()
                        .setStyle("PRIMARY")
                        .setCustomId(`lb_back`)
                        .setEmoji(`◀`)
                        .setDisabled(true)

                    let nextControlButton = new Discord.MessageButton()
                        .setStyle("PRIMARY")
                        .setCustomId(`lb_2`)
                        .setEmoji(`▶`)

                    let lastControlButton = new Discord.MessageButton()
                        .setStyle("PRIMARY")
                        .setCustomId(`lb_last`)
                        .setEmoji(`⏭`)

                    if ((i % 10 == 0 ? Math.floor(i / 10) : Math.floor((i / 10) + 1)) == 1) {
                        nextControlButton.setDisabled(true)
                        lastControlButton.setDisabled(true)
                    }

                    let controlButtons = new Discord.MessageActionRow()
                        .setComponents([firstControlButton, backControlButton, nextControlButton, lastControlButton])

                    interaction.update({
                        embeds: [embed],
                        components: [controlButtons]
                    })
                }
            }
        }
    }
}