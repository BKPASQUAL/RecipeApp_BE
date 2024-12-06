const express = require('express');
const recipeRoutes = require('./recipe.routes'); 

const router = express.Router();

router.use('/recipes', recipeRoutes);  

module.exports = router;
