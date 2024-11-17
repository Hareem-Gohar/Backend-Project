// routes/RecipeRoutes.js
const express = require('express');
const {
    getAllRecipes,
    createRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe
} = require('../Controllers/RecipeControlers');
const router = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');

// Route to get all recipes (auth needed)
router.get('/', getAllRecipes);
router.post('/', authMiddleware, createRecipe);
router.get('/:id', getRecipeById);
router.put('/:id', authMiddleware, updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);

module.exports = router;
