// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
      recipe_name: { type: String, required: true },
      image: { type: String, required: true },
      prep_time: { type: Number, required: true },
      cook_time: { type: Number, required: true },
      recipe_making_time: { type: Number, required: true },
      ingredients: { type: [String], required: true },
      recipe_instructions: {
            steps: { type: [String], required: true }
      },
      nutrition: {
            calories: { type: Number, required: true },
            fat: { type: String, required: true },
            carbs: { type: String, required: true },
            protein: { type: Number, required: true }
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
});

module.exports = mongoose.model('Recipe', recipeSchema);
