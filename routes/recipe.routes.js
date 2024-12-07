const express = require("express");
const {
  fetchRecipesByCategory,
  fetchRecipesById,
} = require("../controllers/recipe.controller");
const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/category/:category", fetchRecipesByCategory);
router.get("/:id", fetchRecipesById);

module.exports = router;
