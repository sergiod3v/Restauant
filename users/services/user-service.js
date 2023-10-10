const mongoose = require('mongoose')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const getAllService = async (req, res) => {
  const users = await User.find({}).select('-password -__v')
  res.status(StatusCodes.OK).json({ data: users })
}

const getSingleService = async (id, res) => {
  const user = await User.findById(id).select('-pasword')
  if (user) {
    res.status(StatusCodes.OK).json({ user })
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: `User with id <${id}> does not exist`
      })
  }
}

const updateService = async (id, body, res) => {
  const user = await User
    .findOneAndUpdate(
      { _id: id },
      body,
      {
        new: true,
        runValidators: true
      }
    ).select('-pasword')
  res
    .status(StatusCodes.OK)
    .json({
      message: "User successfully updated!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        updatedAt: user.updatedAt,
      }
    })
}

const deleteService = async (id, res) => {
  const user = await User.findOneAndDelete({ _id: id }).select('-pasword')
  res
    .status(StatusCodes.OK)
    .json({
      message: "User successfully deleted",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        deletedAt: user.deletedAt,
      }
    })
}

module.exports = {
  getAllService,
  getSingleService,
  updateService,
  deleteService,
} 