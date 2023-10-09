const mongoose = require('mongoose')
const User = require('../models/user')
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
const createUser = async (req, res) => {
  console.log(req.body)
  return res.json({ msg: req.body })
}
const deleteUser = async (req, res) => {
  return res.json({ msg: "User deleted" })
}

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
}