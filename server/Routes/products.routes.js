
const express = require('express')
const { getAllProducts } = require('../Controllers/products.contollers')


    const productRouter = express.Router()
    .get("/list-products", getAllProducts)

    module.exports = { productRouter }