const Recipe = require("../models/RecipeModel");
const RecipeIngredient = require("../models/RecipeIngredientsModel");
const Step = require("../models/StepModel");

const handleGetAll = async (req, res) => {
  try {
    const recipes = await Recipe.find({ status: "published" })
      .select("name duration serving speciality mainUrl")
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handleCreate = async (req, res) => {
  try {
    const { name, duration, serving, speciality } = req.body;

    const recipe = new Recipe({
      name,
      duration,
      serving,
      speciality,
      status: "draft",
      mainUrl: "https://via.placeholder.com/400x300",
    });

    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    }).populate("ingredientId");

    const steps = await Step.find({ recipeId: req.params.id }).sort({
      step: 1,
    });

    res.json({
      recipe,
      ingredients,
      steps,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handlePublish = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { status: "published" },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const handleAddIngredient = async (req, res) => {
  const { recipeId } = req.params;
  const { ingredients } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const savedIngredients = await RecipeIngredient.insertMany(
      ingredients.map((ing) => ({
        name: ing.name,
        recipeId,
        ingredientId: ing.ingredientId,
        quantity: ing.quantity,
        unit: ing.unit,
        optional: ing.optional || false,
      }))
    );

    res.status(201).json(savedIngredients);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Ingredient already added to this recipe",
      });
    }
    res.status(500).json({ message: error.message });
  }
};
const handleGetIngredient = async (req, res) => {
  try {
    const ingredients = await RecipeIngredient.find({
      recipeId: req.params.recipeId,
    }).populate("ingredientId");

    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handleCreateSteps = async (req, res) => {
  const { recipeId } = req.params;
  const { steps } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const stepsToAdd = Array.isArray(steps) ? steps : [req.body];

    const savedSteps = await Step.insertMany(
      stepsToAdd.map((step) => ({
        recipeId,
        step: step.step,
        description: step.description,
        imageUrl: step.imageUrl || null,
      }))
    );

    res.status(201).json(savedSteps);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const handleGetSteps = async (req, res) => {
  try {
    const steps = await Step.find({ recipeId: req.params.recipeId }).sort({
      step: 1,
    });

    res.json(steps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handleUpdateInfo = async (req, res) => {
  try {
    const { name, duration, serving, speciality } = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { name, duration, serving, speciality },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const handleUpdateSteps = async (req, res) => {
  try {
    const { description, imageUrl, step } = req.body;

    const updateFields = {};
    if (description !== undefined) updateFields.description = description;
    if (imageUrl !== undefined) updateFields.imageUrl = imageUrl;
    if (step !== undefined) updateFields.step = step;

    const updatedStep = await Step.findOneAndUpdate(
      {
        _id: req.params.stepId,
        recipeId: req.params.recipeId,
      },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedStep) {
      return res.status(404).json({ message: "Step not found" });
    }

    res.json(updatedStep);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const handleDeleteSpecific = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await RecipeIngredient.deleteMany({ recipeId: req.params.id });
    await Step.deleteMany({ recipeId: req.params.id });
    await recipe.deleteOne();

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleGetAll,
  handleCreate,
  handleGetSpecific,
  handlePublish,
  handleAddIngredient,
  handleGetIngredient,
  handleCreateSteps,
  handleGetSteps,
  handleUpdateInfo,
  handleUpdateSteps,
  handleDeleteSpecific,
};
