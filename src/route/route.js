const express = require('express')
const router = express.Router()

const { registerUser, userLogin} = require('../controller/userController')
const { adminLogin, getUser, getSlot, filterUser} = require('../controller/adminController')
const { authorize } = require('../middleware/auth')
const { availableSlot } = require("../controller/slotController")

router.post('/register', registerUser)
router.post('/login', userLogin)

router.post('/adminlogin', adminLogin)
router.get('/getuser', authorize, getUser)
router.get('/slot',authorize, getSlot)
router.get('/filter',authorize, filterUser)

router.get('/slot',availableSlot)

module.exports = router