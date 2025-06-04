const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Step = new Schema({
  step: { type: Number, required: true },
  imageUrl: { type: String, required: false },
  description: { type: String, required: true },
  recipeId: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
});

const StepModel = mongoose.model("Step", Step);
module.exports = StepModel;
