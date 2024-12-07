const favoritesService = require("../services/favorites.service");

// Centralized response messages for reusability
const RESPONSE_MESSAGES = {
  recipeExists: "Recipe already in favourites",
  addSuccess: "Recipe added to favourites successfully",
  addFail: "Failed to add favourite recipe",
  fetchFail: "Failed to fetch favourite recipes",
  removeSuccess: "Recipe removed from favourites successfully",
  removeFail: "Failed to remove favourite recipe",
};

async function addFavoriteRecipe(req, res) {
  const { recipeId, recipeTitle, recipeCategory, recipeImgURL } = req.body;
  const userId = req.user.userId;

  try {
    const favoriteExists = await favoritesService.findFavouriteRecipeById(
      userId,
      recipeId
    );

    if (favoriteExists) {
      return res.status(400).json({ message: RESPONSE_MESSAGES.recipeExists });
    }

    await favoritesService.addFavorite({
      userId,
      recipeId,
      recipeTitle,
      recipeCategory,
      recipeImgURL,
    });

    return res.status(201).json({ message: RESPONSE_MESSAGES.addSuccess });
  } catch (error) {
    console.error("Error in addFavoriteRecipe:", error);
    return res.status(500).json({ message: RESPONSE_MESSAGES.addFail });
  }
}

async function getFavoriteRecipes(req, res) {
  const userId = req.user.userId;

  try {
    const favorites = await favoritesService.getFavoritesByUserId(userId);
    return res.status(200).json(favorites);
  } catch (error) {
    console.error("Error in getFavoriteRecipes:", error);
    return res.status(500).json({ message: RESPONSE_MESSAGES.fetchFail });
  }
}

async function removeFavoriteRecipe(req, res) {
  const { recipeId } = req.params;
  const userId = req.user.userId;

  try {
    await favoritesService.removeFavorite(userId, recipeId);
    return res.status(200).json({ message: RESPONSE_MESSAGES.removeSuccess });
  } catch (error) {
    console.error("Error in removeFavoriteRecipe:", error);
    return res.status(500).json({ message: RESPONSE_MESSAGES.removeFail });
  }
}

module.exports = {
  addFavoriteRecipe,
  getFavoriteRecipes,
  removeFavoriteRecipe,
};
