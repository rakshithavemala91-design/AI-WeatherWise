const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate favorite locations for the same user
locationSchema.index(
  { user: 1, city: 1, country: 1 },
  { unique: true }
);

module.exports = mongoose.model("Location", locationSchema);