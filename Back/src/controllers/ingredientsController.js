const Ingredients = require("../models/IngredientsModel");

const handleCreateIngredients = async (req, res) => {
  try {
    const { name, category, imageUrl } = req.body;

    const newIngredient = new Ingredients({
      name,
      category,
      imageUrl: imageUrl || "https://via.placeholder.com/200",
    });

    const saved = await newIngredient.save();
    res.status(201).json(saved);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Ingredient already exists" });
    }
    res.status(400).json({ message: error.message });
  }
};

const handleGetAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredients.find().sort({ category: 1, name: 1 });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handleSearchIngredient = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required" });
    }

    const ingredients = await Ingredients.find({
      name: { $regex: q, $options: "i" },
    });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetIngredientByCategory = async (req, res) => {
  try {
    const ingredients = await Ingredients.find({
      category: req.params.category,
    }).sort({ name: 1 });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleCreateIngredients,
  handleGetAllIngredients,
  handleSearchIngredient,
  handleGetIngredientByCategory,
};
