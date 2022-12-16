const mongoose = require("mongoose");


const groupchatSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp : String,
    recieved: Boolean
});

const Messages = new mongoose.model('messageContent', groupchatSchema); //messageContent will turn to messageContents
module.exports = Messages;