const Recipe = require('../Models/recipes');
const User = require('../Models/user');
const mongoose = require('mongoose');

// get all the recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Get a single recipe by ID

exports.getRecipeById = async (req, res) => {
      try {
            const recipe = await Recipe.findById(req.params.id);
            if (!recipe) {
                  return res.status(404).json({ message: 'Recipe not Found' })
            }
            res.json(recipe);
      }
      catch (err) {
            res.status(500).json({ messgae: err.message });
      }
}


// create new Recipe
exports.createRecipe = async (req, res) => {
    const {
        recipe_name,
        image,
        prep_time,
        cook_time,
        recipe_making_time,
        ingredients,
        recipe_instructions,
        nutrition
    } = req.body;

    try {
        const newRecipe = new Recipe({
            _id: new mongoose.Types.ObjectId(),
            recipe_name,
            image,
            prep_time,
            cook_time,
            recipe_making_time,
            ingredients,
            recipe_instructions,
            nutrition,
            user: req.user.id // Access user ID from req.user
        });

        const newRecipeCreated = await newRecipe.save();
        await User.findByIdAndUpdate(req.user.id, { $push: { recipes: newRecipeCreated._id } });

        res.status(201).json(newRecipeCreated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update an Existing recipe

exports.updateRecipe = async (req, res) => {
      try {
            const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (!updatedRecipe) {
                  return res.status(404).json({ message: 'Recipe not Found' })
            }
            res.json(updatedRecipe);
      }
      catch (err) {
            res.status(500).json({ message: err.message });
      }
}

// Delete Recipe

exports.deleteRecipe = async (req, res) => {
      try {
            const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);
            if (!deletedRecipe) {
                  return res.status(404).json({ message: 'Recipe not Found' })
            }
            res.json({ message: 'Recipe Deleted' });
      }
      catch (err) {
            res.status(500).json({ message: err.message });
      }
}