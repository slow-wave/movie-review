const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    tagArray: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);
module.exports = { Tag };
