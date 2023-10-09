const mongoose = require('mongoose')

const getAllUsers = async (req, res) => {
  return res.json({ users: [] })
}
const getUser = async (req, res) => {
  return res.json({ User })
}
const updateUser = async (req, res) => {
  return res.json({ newUser })
}
const createUser = async (req, res) => {
  return res.json({ msg: "User created" })
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