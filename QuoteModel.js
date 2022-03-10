const mongoose = require("mongoose");
const quoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    song: {
      type: String,
      required: false,
    },
    singer: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quote", quoteSchema);
