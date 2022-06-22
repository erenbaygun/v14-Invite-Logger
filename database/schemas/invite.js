const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    guildId: String,
    invites: [Object],
    vanity: Object
});

const invite = mongoose.model('invite', inviteSchema, 'inviteData');

module.exports = invite;