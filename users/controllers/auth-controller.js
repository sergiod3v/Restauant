const {
  registerService,
  loginService,
  checkPalancaService
} = require('../services/auth-service')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  try {
    await registerService(req.body, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}
const login = async (req, res) => {
  try {
    await loginService(req.body, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const check_palanca = async (req, res) => {
  try {
    checkPalancaService(req.body, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error" })
  }
}


module.exports = {
  login,
  register,
  check_palanca
}