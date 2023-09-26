const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
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
    userId: {
      type: Schema.Types.ObjectId,
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
    userId: {
      type: Schema.Types.ObjectId,
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

const thought = new Thought({
  thoughtText: "Thinking",
  username: "yub",
  userId: "650f66e75bd2b5b03c8bae41",
  reactions: [
    {
      reactionBody: "That is a great thought",
      username: "yub",
      userId: "650f66e75bd2b5b03c8bae41",
    },
  ],
});

module.exports = Thought;
