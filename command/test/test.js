module.exports = {
    name: 'test',
    aliases: ['tst'],
    dir: "test",
    permissions: [],

    run: async (client, message, args) => {
        message.reply('you runned the test command')
    }
}