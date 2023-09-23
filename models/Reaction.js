const { Schema, model } = require('mongoose');

const Reaction = new Schema(
  {
    reactionId: {},
    reactionBody: {},
    username: {},
    createdAt: {}
  },
  {

  }

)


module.exports = Reaction