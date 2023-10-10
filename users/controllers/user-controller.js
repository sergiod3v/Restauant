const mongoose = require('mongoose')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const {
  getAllService,
  getSingleService,
  updateService,
  deleteService,
} = require('../services/user-service')

const getAllUsers = async (req, res) => {
  try {
    await getAllService(req, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const getUser = async (req, res) => {
  try {
    const { id: userID } = req.params
    await getSingleService(userID, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const { id: userID } = req.params
    await updateService(userID, req.body, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id: userID } = req.params
    await deleteService(userID, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
}