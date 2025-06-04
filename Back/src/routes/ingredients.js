const express = require("express");
const router = express.Router();
const {
  handleCreateIngredients,
  handleGetAllIngredients,
  handleSearchIngredient,
  handleGetIngredientByCategory,
} = require("../controllers/ingredientsController");

// create ingredients
router.post("/", handleCreateIngredients);

//   Get all ingredients (catalog)
router.get("/", handleGetAllIngredients);

//    Search ingredients by name
router.get("/search", handleSearchIngredient);

//  Get ingredients by category
router.get("/category/:category", handleGetIngredientByCategory);

module.exports = router;
