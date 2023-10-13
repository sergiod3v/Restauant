const express = require('express')
const router = express.Router()

const {
  login,
  register,
  check_palanca
} = require('../controllers/auth-controller')


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/palanca').post(check_palanca)

module.exports = router