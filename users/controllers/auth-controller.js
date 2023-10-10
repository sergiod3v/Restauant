const mongoose = require('mongoose')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  const { email, password } = req.body

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: "Email must be provided."
      })
  }
  if (!password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: "Password must be provided."
      })
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({
        error: "The User is already registered."
      })
  }

  const user = await User.create(req.body)

  if (user) {
    return res
      .status(StatusCodes.CREATED)
      .json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }
      })
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "internal error" })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: "Email must be provided."
      })
  }
  if (!password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: "Password must be provided."
      })
  }

  const user = await User.findOne({ email })

  if (!user) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({
        error: "User not registered"
      })
  }

  const token = user.createJWT()
  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'Password is wrong',
    });
  }

  res.status(StatusCodes.OK).json({
    msg: "Successfully logged in!",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token
  })
}

module.exports = {
  login,
  register,
}