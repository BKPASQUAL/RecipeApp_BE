const express = require('express');
const recipeRoutes = require('./recipe.routes'); 
const favoritesRoutes = require('./favorites.routes');  

const router = express.Router();

router.use('/recipes', recipeRoutes);  
router.use('/favourites', favoritesRoutes);  

module.exports = router;
