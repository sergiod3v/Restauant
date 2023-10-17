const express = require('express')
const router = express.Router()

const {
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  createRecipe,
  deleteAllRecipes
} = require('../controllers/recipe-controller')


router.route('/').post(createRecipe).get(getAllRecipes).delete(deleteAllRecipes)
router.route('/:id').get(getRecipe).patch(updateRecipe).delete(deleteRecipe)

module.exports = router