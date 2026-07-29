const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  mediaUrl: {
    type: String,
    default: "",
  },

  mediaType: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },

  likes: {
    type: Number,
    default: 0,
  },

  comments: [
    {
      user: String,
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  shares: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);