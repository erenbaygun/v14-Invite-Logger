module.exports = async (client, message) => {
    if (message.author.bot) { return }
    if (message.channel.type == 'dm') { return }
    let prefix = client.config.bot.prefix

    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) { return message.channel.send(`Selam, Ben ${client.user.username}! Bu sunucudaki ön ekim \`${prefix}\`\n\`${prefix}help\` yazarak tüm komutlarıma ulaşabilirsin.`) }
    if (!message.content.startsWith(prefix)) { return }

    const command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
    const args = message.content.split(' ').slice(1);
    let cmd;

    if (client.commandes.has(command)) { cmd = client.commandes.get(command) }
    else if (client.aliases.has(command)) { cmd = client.commandes.get(client.aliases.get(command)) }
    if (!cmd) return;

    const props = require(`../command/${cmd.dir}/${cmd.name}`);

    // PERMISSION CHECKER
    if (props.permissions) {
        if (!message.member.permissions.has(props.permissions)) {
            return message.reply(`:x: | Şu izinler eksik : ${props.permissions.map(p => `\`${p}\``).join(', ')}`)
        }
    }

    //LOADING COMMANDS
    try {
        cmd.run(client, message, args);
    } catch (e) {
        client.emit("error", e, message);
    }
};
