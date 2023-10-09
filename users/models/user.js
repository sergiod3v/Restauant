require('dotenv').config()
const emailRegEx = require('../utils')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        emailRegEx,
        'Please provide valid email'
      ],
      unique: true,
    },
    role: {
      type: String,
      enum: ['manager', 'gomelo_user', 'normal_user', 'chef'],
      default: 'normal_user'
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
      minLength: 6,
    }
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  )
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)