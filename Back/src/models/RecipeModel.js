const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Recipe = new Schema(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    serving: { type: Number, required: true },
    speciality: { type: String, required: true },
    status: {
      enum: ["draft", "published"],
      type: String,
      required: true,
      default: "draft",
    },
    mainUrl: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

const RecipeModel = mongoose.model("Recipe", Recipe);
module.exports = RecipeModel;
