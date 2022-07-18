const Discord = require("discord.js")
const { ButtonStyle } = require("discord.js")
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

        let embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `📋 Sunucu Davet Sıralaması`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setColor("Aqua")
            .setDescription(text)
            .setFooter({ text: `Sayfa 1 / ${i % 10 == 0 ? Math.floor(i / 10) : Math.floor((i / 10) + 1)}` })

        let firstControlButton = new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId(`lb_first`)
            .setEmoji(`⏮`)
            .setDisabled(true)

        let backControlButton = new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId(`lb_back`)
            .setEmoji(`◀`)
            .setDisabled(true)

        let nextControlButton = new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId(`lb_2`)
            .setEmoji(`▶`)

        let lastControlButton = new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId(`lb_last`)
            .setEmoji(`⏭`)

        if ((i % 10 == 0 ? Math.floor(i / 10) : Math.floor((i / 10) + 1)) == 1) {
            nextControlButton.setDisabled(true)
            lastControlButton.setDisabled(true)
        }

        let controlButtons = new Discord.ActionRowBuilder()
            .setComponents([firstControlButton, backControlButton, nextControlButton, lastControlButton])

        message.reply({
            embeds: [embed],
            components: [controlButtons]
        })

    }
}