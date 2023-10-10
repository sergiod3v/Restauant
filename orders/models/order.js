require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minLength: 3,
      maxLength: 50,
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Order', OrderSchema)