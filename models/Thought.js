const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction")


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
    reactions: [Reaction],
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

module.exports = Thought;
