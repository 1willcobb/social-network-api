const { Schema, model } = require('mongoose');

// Schema to create Student model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      
    },
  }
);

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;
