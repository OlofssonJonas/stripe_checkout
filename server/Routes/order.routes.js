const express = require('express')
const { verifyPayment } = require('../Controllers/orders.controller')

const verifyRouter = express.Router()
.post("/verify-session", verifyPayment)

module.exports = { verifyRouter }