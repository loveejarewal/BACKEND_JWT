const express = require('express')
const router = express.Router()
const{registerUser, loginUser, getMe} = require('../controllers/userController')

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/me').get(getMe)


module.exports = router