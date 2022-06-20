module.exports = {
    name: 'test',
    aliases: ['tst'],
    dir: "test",
    permissions: [],

    run: async (client, message, args) => {
        message.reply('test komutunu çalıştırdın')
    }
}