const { getFavoritesCollection } = require("../config/db.config");

const ERROR_MESSAGES = {
  fetch: "Failed to fetch favourites",
  add: "Failed to add favourite recipe",
  remove: "Failed to remove recipe from favorites",
};

const getCurrentTimestamp = () => new Date();

async function findFavouriteRecipeById(userId, recipeId) {
  try {
    const favoritesCollection = getFavoritesCollection();
    return await favoritesCollection.findOne({ userId, recipeId });
  } catch (error) {
    console.error("Error in findFavouriteRecipeById:", error);
    throw new Error(ERROR_MESSAGES.fetch);
  }
}

async function addFavorite({ userId, recipeId, recipeTitle, recipeCategory, recipeImgURL }) {
  try {
    const favoritesCollection = getFavoritesCollection();

    const favorite = {
      userId,
      recipeId,
      recipeTitle,
      recipeCategory,
      recipeImgURL,
      addedAt: getCurrentTimestamp(),
    };

    await favoritesCollection.insertOne(favorite);
  } catch (error) {
    console.error("Error in addFavorite:", error);
    throw new Error(ERROR_MESSAGES.add);
  }
}

async function getFavoritesByUserId(userId) {
  try {
    const favoritesCollection = getFavoritesCollection();
    return await favoritesCollection.find({ userId }).toArray();
  } catch (error) {
    console.error("Error in getFavoritesByUserId:", error);
    throw new Error(ERROR_MESSAGES.fetch);
  }
}

async function removeFavorite(userId, recipeId) {
  try {
    const favoritesCollection = getFavoritesCollection();
    const result = await favoritesCollection.deleteOne({ userId, recipeId });

    if (result.deletedCount === 0) {
      throw new Error("Favorite recipe not found");
    }
  } catch (error) {
    console.error("Error in removeFavorite:", error);
    throw new Error(ERROR_MESSAGES.remove);
  }
}

module.exports = {
  findFavouriteRecipeById,
  addFavorite,
  getFavoritesByUserId,
  removeFavorite,
};
