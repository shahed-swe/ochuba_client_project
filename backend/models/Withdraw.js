const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
  Amount: {
    type: String,
    default: "",
  },
  IBAN: {
    type: String,
    default: "",
  },
  Status: {
    type: String,
    default: "",
  },
  User: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    phoneNumber: String
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Withdraw", withdrawSchema);
