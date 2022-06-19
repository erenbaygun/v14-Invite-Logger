const { Client, Collection } = require("discord.js");
const { readdirSync, readdir } = require("fs");

const client = global.client = new Client({ intents: 32767 })

//SET COLLECTION
client.commandes = new Collection();
client.aliases = new Collection();

//SET UTILS
client.logger = require('./utils/logger');
client.color = require('./utils/color.js');

//SET CONFIG
client.config = require('./config');

["error", "command", "event"].forEach(file => { require(`./utils/handlers/${file}`)(client) })

client.login(client.config.bot.token);