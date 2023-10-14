require('dotenv').config()
const mongoose = require('mongoose')
const Order = require('../models/order')
const { StatusCodes } = require('http-status-codes')
const axios = require('axios')

const getAllService = async (req, res) => {
  const orders = await Order.find({}).populate('recipe').lean().select('-__v')
  res.status(StatusCodes.OK).json({ orders })
}

const getSingleService = async (id, res) => {
  const order = await Order.findById(id).populate('recipe').lean()
  if (order) {
    res.status(StatusCodes.OK).json({ order })
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: `Order with id <${id}> does not exist`
      })
  }
}

const createService = async (body, res) => {
  const { recipe } = body
  if (!recipe) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: `Every order must have a recipe.`
      })
  }
  const order = await Order.create(body).populate('recipe').lean()
  res
    .status(StatusCodes.OK)
    .json({
      message: "Order successfully created!",
      order: {
        id: order._id,
        recipe: order.recipe,
        assigned_users: order.assigned_users,
        status: order.status,
        recipe: order.recipe,
        createdAt: order.createdAt,
      }
    })
}

const updateService = async (id, body, res) => {
  const order = await Order
    .findOneAndUpdate(
      { _id: id },
      body,
      {
        new: true,
        runValidators: true
      }
    ).populate('recipe').lean()
  res
    .status(StatusCodes.OK)
    .json({
      message: "order successfully updated!",
      order
    })
}

const deleteService = async (id, res) => {
  const order = await Order.findOneAndDelete({ _id: id }).populate('recipe').lean()
  res
    .status(StatusCodes.OK)
    .json({
      message: "order successfully deleted",
      order: {
        id: order._id,
        name: order.name,
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