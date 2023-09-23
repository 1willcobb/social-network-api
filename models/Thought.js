const { Schema, model } = require('mongoose');

// Schema to create Student model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 500
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocalDateString("en-US")
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema],
    
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;
