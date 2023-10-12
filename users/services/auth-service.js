const mongoose = require('mongoose')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const registerService = async (body, res) => {
  const { email, password } = body
  if (!email) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: "Email has to be provided"
      })
  }
  if (!password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: "Password has to be provided"
      })
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: "Email already registered"
      })
  }

  const user = await User.create(body)
  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    })

}


const loginService = async (body, res) => {
  const { email, password } = body

  console.log(body)

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
    message: "Successfully logged in!",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token
  })
}

module.exports = {
  registerService,
  loginService
}