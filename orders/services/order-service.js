const mongoose = require('mongoose')
const Order = require('../models/order')
const { StatusCodes } = require('http-status-codes')

const getAllService = async (req, res) => {
  const orders = await Order.find({})
  res.status(StatusCodes.OK).json({ data: orders })
}

const getSingleService = async (id, res) => {
  const order = await Order.findById(id)
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
  const { name } = body
  if (!name) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: `Please provide a name.`
      })
  }
  const order = await Order.create(body)
  res
    .status(StatusCodes.OK)
    .json({
      message: "Order successfully created!",
      order: {
        id: order._id,
        name: order.name,
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
    )
  res
    .status(StatusCodes.OK)
    .json({
      message: "order successfully updated!",
      order: {
        id: order._id,
        name: order.name,
      }
    })
}

const deleteService = async (id, res) => {
  const order = await Order.findOneAndDelete({ _id: id })
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