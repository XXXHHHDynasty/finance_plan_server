const express = require('express')
const router = express.Router()

const userHandler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')

// Register a new user
router.post('/reguser', (expressJoi(reg_login_schema), userHandler.regUser))

// Log in
router.post('/login', (expressJoi(reg_login_schema), userHandler.login))

module.exports = router
