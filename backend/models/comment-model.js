const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  episode: {
    type: String,
    required: true,
  },
  like: {
    type: [String],
    default: [],
  },
  dislike: {
    type: [String],
    default: [],
  },
  reply: {
    type: [Object],
    default: [],
    required: true,
  },
  //已刪除的功能(保留寫法)
  // replyTo: {
  //   type: String,
  //   required: function () {
  //     return this.type === "reply";
  //   },
  // },
  // floor: {
  //   type: String,
  //   required: function () {
  //     return this.type === "reply";
  //   },
  // },
  // type: {
  //   type: String,
  //   enum: ["comment", "reply"],
  //   required: true,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
