const mongoose = require('mongoose')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const getAllService = async (req, res) => {
  const users = await User.find({}).select('-password -__v')
  res.status(StatusCodes.OK).json({ data: users })
}

const getSingleService = async (id, res) => {
  console.log("service accessed")
  const user = await User.findById(id)

  if (user) {
    res.status(StatusCodes.OK).json({ user })
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: `User with id <${id}>`
      })
  }
}

const updateService = async (id, res) => {

}

const deleteService = async (id, res) => {

}

module.exports = {
  getAllService,
  getSingleService,
  updateService,
  deleteService,
} 