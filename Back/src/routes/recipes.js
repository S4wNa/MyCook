const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/recipesController");

// ============ RECIPE ROUTES ============

//    Get all published recipes
router.get("/", handleGetAll);

//    Create a new recipe
router.post("/", handleCreate);

//   Get recipe with all details
router.get("/:id", handleGetSpecific);

//    Publish a recipe
router.put("/:id/publish", handlePublish);

// ============ INGREDIENT ROUTES (for recipes) ============

//   Add ingredients to a recipe
router.post("/:recipeId/ingredients", handleAddIngredient);

//  Get ingredients for a recipe
router.get("/:recipeId/ingredients", handleGetIngredient);

// ============ STEP ROUTES ============

//   Add multiple steps at once
router.post("/:recipeId/steps", handleCreateSteps);

//   Get all steps for a recipe
router.get("/:recipeId/steps", handleGetSteps);

//   Update recipe info
router.put("/:id", handleUpdateInfo);

// upadate recipe's steps
router.put("/:recipeId/steps/:stepId", handleUpdateSteps);

// Delete a recipe and all its relations
router.delete("/:id", handleDeleteSpecific);

module.exports = router;
