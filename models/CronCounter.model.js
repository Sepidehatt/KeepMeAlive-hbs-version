const { Schema, model } = require("mongoose");

const counterSchema = new Schema(
  {
    count: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
)

const Counter = model("Counter", counterSchema)
module.exports = Counter;