const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "PLEASE ADD THE NAME"],
    },
    email: {
      type: String,
      required: [true, "PLEASE ADD THE EMAIL"],
    },
    phone: {
      type: Number,
      required: [true, "PLEASE ADD THE PHONE NUMBER"],
    },
  },
  {
    timestamp: true,
  }
);
module.exports = mongoose.model("Contact", contactSchema);
