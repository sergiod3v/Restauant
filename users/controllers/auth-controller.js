const mongoose = require('mongoose')

const login = async (req, res) => {
  return res.json({ msg: "Login Endpoint" })
}
const register = async (req, res) => {
  return res.json({ msg: "Register Endpoint" })
}

module.exports = {
  login,
  register,
}