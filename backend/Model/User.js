const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    unique: true,
    sparse: true,
  },

  phone: {
    type: String,
    unique: true,
    sparse: true,
  },

  password: {
    type: String,
    required: true,
  },

  lastPasswordReset: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("User", UserSchema);