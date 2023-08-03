const express = require('express')
const router = express.Router();
const registerController = require('../app/controllers/auth/register.controller.js')
const loginController = require('../app/controllers/auth/login.controller.js')
const authMiddleware = require('../app/controllers/middlewares/auth.controller.js')
  
router.get('/:name', (req, res) => {
    res.send(`Welcome User ${req.params.name.toUpperCase()}!`)
})

router.post('/register', (req, res, next) => {
    return registerController.init(req, res)
})

router.post('/login', authMiddleware, (req, res, next) => {
    return loginController.init(req, res)
})

module.exports = router
