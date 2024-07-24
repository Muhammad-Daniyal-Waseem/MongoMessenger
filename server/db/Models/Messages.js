const mongoose = require("mongoose");

const MessagesSchema = mongoose.Schema({
  conversationId: {
    type: String,
  },
  senderId: {
    type: String,
  },
  message:{
    type:String
  }
});

const Messages = mongoose.model("Message", MessagesSchema);
module.exports = Messages;
