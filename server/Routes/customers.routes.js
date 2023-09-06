const express = require('express')
const { registerCustomer, loginCustomer } = require('../Controllers/customers.controller')

const customerRouter = express.Router()
.post("/customers/register", registerCustomer)
.post("/customers/login", loginCustomer)


module.exports = { customerRouter }