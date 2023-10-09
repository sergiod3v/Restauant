const mongoose = require('mongoose')

const getAllOrders = async (req, res) => {
  return res.json({ orders: [] })
}
const getOrder = async (req, res) => {
  console.log(req.params)
  return res.json({ order })
}
const updateOrder = async (req, res) => {
  return res.json({ newOrder })
}
const createOrder = async (req, res) => {
  return res.json({ msg: "order created" })
}
const deleteOrder = async (req, res) => {
  return res.json({ msg: "order deleted" })
}

module.exports = {
  getAllOrders,
  getOrder,
  updateOrder,
  createOrder,
  deleteOrder,
}