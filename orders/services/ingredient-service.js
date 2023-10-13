require('dotenv').config()
const Ingredient = require('../models/ingredient')
const { StatusCodes } = require('http-status-codes')

const getAllService = async (req, res) => {
  const ingredients = await Ingredient.find({}).select('-__v')
  res.status(StatusCodes.OK).json({ ingredients })
}

const getSingleService = async (id, res) => {
  const ingredient = await Ingredient.findById(id)
  if (ingredient) {
    res.status(StatusCodes.OK).json({ ingredient })
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: `Ingredient with id <${id}> does not exist`
      })
  }
}

const createService = async (body, res) => {
  console.log(`create ingredient: ${body}`)
  const { name } = body
  if (!name) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: `Please provide a name.`
      })
  }
  const ingredient = await Ingredient.create(body)
  res
    .status(StatusCodes.OK)
    .json({
      message: "Ingredient successfully created!",
      ingredient: {
        id: ingredient._id,
        name: ingredient.name,
      }
    })
}

const updateService = async (id, body, res) => {
  const ingredient = await Ingredient
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
      message: "ingredient successfully updated!",
      ingredient: {
        id: ingredient._id,
        name: ingredient.name,
      }
    })
}

const deleteService = async (id, res) => {
  const ingredient = await Ingredient.findOneAndDelete({ _id: id })
  res
    .status(StatusCodes.OK)
    .json({
      message: "ingredient successfully deleted",
      ingredient: {
        id: ingredient._id,
        name: ingredient.name,
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