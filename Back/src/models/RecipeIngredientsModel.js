const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeIngredients = new Schema(
  {
    name: { type: String },
    recipeId: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
    ingredientId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Ingredients",
    },
    quantity: { type: Number, required: true },
    unit: {
      type: String,
      required: true,
      enum: ["cups", "tbsp", "tsp", "g", "kg", "ml", "L", "oz", "lb", "pieces"],
    },
    optional: { type: Boolean, default: false },
  },
  { timestamps: true }
);

RecipeIngredients.index({ recipeId: 1, ingredientId: 1 }, { unique: true });

const RecipeIngredientsModel = mongoose.model(
  "RecipeIngredients",
  RecipeIngredients
);
module.exports = RecipeIngredientsModel;
