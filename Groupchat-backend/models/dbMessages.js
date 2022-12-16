const mongoose = require("mongoose");


const groupchatSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp : String
});

const Messages = new mongoose.model('messageContent', groupchatSchema);
module.exports = Messages;