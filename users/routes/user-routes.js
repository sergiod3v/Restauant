const express = require('express')
const router = express.Router()

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser
} = require('../controllers/user-controller')


router.route('/').post(createUser).get(getAllUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router