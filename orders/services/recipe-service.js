require('dotenv').config()
const { StatusCodes } = require('http-status-codes')
const Recipe = require('../models/recipe')

const getAllService = async (req, res) => {
  const recipes = await Recipe.find({}).select('-__v')
  res.status(StatusCodes.OK).json({ recipes })
}

const getSingleService = async (id, res) => {
  const recipe = await Recipe.findById(id)
  if (recipe) {
    res.status(StatusCodes.OK).json({ recipe })
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: `Recipe with id <${id}> does not exist`
      })
  }
}

const createService = async (body, res) => {
  const { name, ingredients } = body
  if (!name) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: `Please provide a name.`
      })
  }
  if (!ingredients || ingredients.length < 4) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: `Please provide a list of at least 4 ingredients.`
      })
  }

  const recipe = await Recipe.create(body)
  res
    .status(StatusCodes.OK)
    .json({
      message: "Recipe successfully created!",
      recipe: {
        id: recipe._id,
        name: recipe.name,
        ingredients: recipe.ingredients,
      }
    })
}

const updateService = async (id, body, res) => {
  const recipe = await Recipe
    .findOneAndUpdate(
      { _id: id },
      body,
      {
        new: true,
        runValidators: true
      }
    )
  res
    .status(StatusCodes.OK)
    .json({
      message: "Recipe successfully updated!",
      recipe: {
        id: recipe._id,
        name: recipe.name,
        ingredients: recipe.ingredients,
      }
    })
}

const deleteService = async (id, res) => {
  const recipe = await Recipe.findOneAndDelete({ _id: id })
  res
    .status(StatusCodes.OK)
    .json({
      message: "Recipe successfully deleted",
      recipe: {
        id: recipe._id,
        name: recipe.name,
      }
    })
}

module.exports = {
  getAllService,
  getSingleService,
  updateService,
  deleteService,
  createService
} 