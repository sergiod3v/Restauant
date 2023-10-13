require('dotenv').config()
const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minLength: 3,
      maxLength: 50,
    },
    recipe: { type: mongoose.Types.ObjectId, ref: 'Recipe' },
    assigned_users: Array,
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Order', OrderSchema)