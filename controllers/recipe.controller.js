const recipeService = require("../services/recipe.service");

//Fetch all recipes by category
async function fetchRecipesByCategory(req, res) {
  const { category } = req.params;

  try {
    const recipes = await recipeService.getAllRecipesByCategory(category);
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
}

//Fetch a recipe by the recipe ID
async function fetchRecipesById(req, res) {
  const { id } = req.params;

  try {
    const recipe = await recipeService.getRecipesById(id);
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipes", error);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
}

module.exports = { fetchRecipesByCategory, fetchRecipesById };