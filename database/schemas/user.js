const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: String,
    invites: [Object],
});

const user = mongoose.model('user', userSchema, 'userData');

module.exports = user;