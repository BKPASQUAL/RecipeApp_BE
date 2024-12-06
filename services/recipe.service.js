const axios = require("axios");

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function getAllRecipesByCategory(category) {
  try {
    const response = await axios.get(
      `${BASE_URL}/filter.php?c=${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in recipe service:", error);
    throw new Error("Failed to fetch recipes from external API");
  }
}

async function getRecipesById(id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/lookup.php?i=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in recipe service:", error);
    throw new Error("Failed to fetch recipe data from external API");
  }
}

module.exports = { getAllRecipesByCategory, getRecipesById };