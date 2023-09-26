const { ObjectId } = require("mongoose").Types;
const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleDateString("en-US"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Schema to create Student model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleDateString("en-US"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

const Thought = model("Thought", thoughtsSchema);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

Thought.create({
  thoughtText: "Here is my first thoughts",
  username: 'ygjhfgfugfcuf'
},
{
  thoughtText: "thought 2!!!",
  username: 'yub'
})

module.exports = {Thought};
