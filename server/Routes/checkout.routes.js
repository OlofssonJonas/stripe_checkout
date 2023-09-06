
const express = require('express')
const { checkoutController } = require('../Controllers/checkout.controller')

const checkoutRouter = express.Router()
.post("/create-checkout-session", checkoutController)

module.exports = { checkoutRouter }