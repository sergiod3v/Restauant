require('dotenv').config()
const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema(
  {
    recipe: { type: mongoose.Types.ObjectId, ref: 'Recipe' },
    assigned_users: Array,
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Order', OrderSchema)