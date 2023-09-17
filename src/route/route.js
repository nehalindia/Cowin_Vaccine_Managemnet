const express = require('express')
const router = express.Router()

const { registerUser, userLogin} = require('../controller/userController')
const { adminLogin, getUser} = require('../controller/adminController')
const { authorize } = require('../middleware/auth')

router.post('/register', registerUser)
router.post('/login', userLogin)

router.post('/adminlogin', adminLogin)
router.get('/getuser', authorize, getUser)

module.exports = router