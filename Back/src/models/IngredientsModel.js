const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Ingredients = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    name: { type: String, required: true, unique: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Vegetables",
        "Meats",
        "Fish",
        "Dairy",
        "Spices",
        "Grains",
        "Fruits",
      ],
    },
  },
  { timestamps: true }
);

const IngredientsModel = mongoose.model("Ingredients", Ingredients);
module.exports = IngredientsModel;
