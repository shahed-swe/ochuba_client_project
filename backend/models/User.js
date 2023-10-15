const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: ""
  },
  phoneNumber: {
    type: String,
    unique: [true, "This Phone Number already exists"],
    required: [true, "Please add Phone Number"],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  profilePhoto: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    default: 0,
  },
  profit: {
    type: Number,
    default: 0,
  },
  bids: [],
  history: [],
});

module.exports = mongoose.model("User", userSchema);
