const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        error: "Unauthorized, please login."
      })
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    //Send everything but the password
    const user = await User.findById(payload.userId).select('-password')
    req.user = user
    next()
  } catch (error) {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({
        error: "Unvalid token, please try again later."
      })
  }
}

module.exports = auth
