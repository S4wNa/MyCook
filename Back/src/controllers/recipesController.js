const Recipe = require("../models/RecipeModel");
const RecipeIngredient = require("../models/RecipeIngredientModel");
const Step = require("../models/StepModel");

const handleGetAll = async (req, res) => {
  try {
    const recipes = await Recipe.find({ status: "published" })
      .select("name duration serving speciality mainUrl userId")
      .sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetMyRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipes = await Recipe.find({ userId })
      .select("name duration serving speciality mainUrl userId status")
      .sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleCreate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, duration, serving, speciality, mainUrl } = req.body;

    const recipe = new Recipe({
      name,
      duration,
      serving,
      speciality,
      mainUrl,
      userId,
      status: "published",
    });

    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetSpecific = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const ingredients = await RecipeIngredient.find({
      recipeId: req.params.id,
    }).populate("ingredientId", "name imageUrl");

    const steps = await Step.find({ recipeId: req.params.id }).sort({
      step: 1,
    });

    res.status(200).json({
      recipe,
      ingredients,
      steps,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleUpdateInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const recipe = await Recipe.findOne({ _id: id, userId });
    if (!recipe) {
      return res
        .status(404)
        .json({ message: "Recipe not found or unauthorized" });
    }

    const { name, duration, serving, speciality, mainUrl } = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { name, duration, serving, speciality, mainUrl },
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleCreateSteps = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    const recipe = await Recipe.findOne({ _id: recipeId, userId });
    if (!recipe) {
      return res
        .status(404)
        .json({ message: "Recipe not found or unauthorized" });
    }

    const { steps } = req.body;

    // Supprimer les anciennes étapes
    await Step.deleteMany({ recipeId });

    // Créer les nouvelles étapes
    const createdSteps = await Step.insertMany(
      steps.map((step) => ({
        ...step,
        recipeId,
      }))
    );

    res.status(200).json(createdSteps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetSteps = async (req, res) => {
  try {
    const steps = await Step.find({ recipeId: req.params.recipeId }).sort({
      step: 1,
    });
    res.status(200).json(steps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleAddIngredient = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    const recipe = await Recipe.findOne({ _id: recipeId, userId });
    if (!recipe) {
      return res
        .status(404)
        .json({ message: "Recipe not found or unauthorized" });
    }

    const { ingredients } = req.body;

    // Supprimer les anciens ingrédients
    await RecipeIngredient.deleteMany({ recipeId });

    // Ajouter les nouveaux ingrédients
    const createdIngredients = await RecipeIngredient.insertMany(
      ingredients.map((ingredient) => ({
        ...ingredient,
        recipeId,
      }))
    );

    res.status(200).json(createdIngredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetIngredient = async (req, res) => {
  try {
    const ingredients = await RecipeIngredient.find({
      recipeId: req.params.recipeId,
    }).populate("ingredientId", "name imageUrl");
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const recipe = await Recipe.findOne({ _id: id, userId });
    if (!recipe) {
      return res
        .status(404)
        .json({ message: "Recipe not found or unauthorized" });
    }

    // Supprimer les ingrédients et les étapes associés
    await RecipeIngredient.deleteMany({ recipeId: id });
    await Step.deleteMany({ recipeId: id });
    await Recipe.findByIdAndDelete(id);

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleGetAll,
  handleGetMyRecipes,
  handleCreate,
  handleGetSpecific,
  handleUpdateInfo,
  handleCreateSteps,
  handleGetSteps,
  handleAddIngredient,
  handleGetIngredient,
  handleDelete,
};
