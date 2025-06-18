const mongoose = require("mongoose");

const recipeIngredientSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    ingredientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredients",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      default: "g",
    },
    optional: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index composé pour éviter les doublons
recipeIngredientSchema.index(
  { recipeId: 1, ingredientId: 1 },
  { unique: true }
);

const RecipeIngredient = mongoose.model(
  "RecipeIngredient",
  recipeIngredientSchema
);

module.exports = RecipeIngredient;
