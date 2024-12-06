const express = require('express');
const { addFavoriteRecipe, getFavoriteRecipes, removeFavoriteRecipe } = require('../controllers/favorites.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', addFavoriteRecipe);
router.get('/', getFavoriteRecipes);
router.delete('/:recipeId', removeFavoriteRecipe);

module.exports = router;