const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: [true, "Please add email"],
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Please add a valid email",
    ],
    unique: [true, "This email already exists"],
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    default: "",
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
