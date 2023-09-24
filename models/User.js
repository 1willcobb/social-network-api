const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");
const thoughtsSchema = require("./Thought");

//TODO CREATE a VIRTUAL called "friendCount" that retreives the length of a users friend array field on query
// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
      default: [],
    },
    friends: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

const User = model("User", userSchema);

userSchema.virtual('friendCount').get(function(){
  return this.friends.length
})

module.exports = User;
