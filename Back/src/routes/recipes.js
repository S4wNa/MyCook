const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");
const auth = require("../middlewares/authMiddleware");

// ============ RECIPE ROUTES ============

// Get all published recipes
router.get("/", recipesController.handleGetAll);

// Get all recipes for the authenticated user
router.get("/my-recipes", auth, recipesController.handleGetMyRecipes);

// Create a new recipe
router.post("/", auth, recipesController.handleCreate);

// Get recipe with all details
router.get("/:id", recipesController.handleGetSpecific);

// Update recipe info
router.put("/:id", auth, recipesController.handleUpdateInfo);

// Update recipe's steps
router.post("/:recipeId/steps", auth, recipesController.handleCreateSteps);

// Get recipe's steps
router.get("/:recipeId/steps", recipesController.handleGetSteps);

// Add ingredients to recipe
router.post(
  "/:recipeId/ingredients",
  auth,
  recipesController.handleAddIngredient
);

// Get recipe's ingredients
router.get("/:recipeId/ingredients", recipesController.handleGetIngredient);

// Delete a recipe
router.delete("/:id", auth, recipesController.handleDelete);

module.exports = router;
