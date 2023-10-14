const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const axios = require('axios')

const auth = async (req, res, next) => {
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
    req.user = payload
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
