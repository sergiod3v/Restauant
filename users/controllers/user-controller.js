const mongoose = require('mongoose')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const getAllUsers = async (req, res) => {
  const users = await User.find({})
  return res.json({ users })
}
const getUser = async (req, res) => {
  return res.json({ user: {} })
}
const updateUser = async (req, res) => {
  return res.json({ new_user: {} })
}
const deleteUser = async (req, res) => {
  return res.json({ msg: "User deleted" })
}

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
}