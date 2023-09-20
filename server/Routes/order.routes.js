const express = require('express')
const { verifyPayment, getOrders } = require('../Controllers/orders.controller')

const verifyRouter = express.Router()
.post("/verify-session", verifyPayment)
.get("/getorders/:id", getOrders)

module.exports = { verifyRouter }