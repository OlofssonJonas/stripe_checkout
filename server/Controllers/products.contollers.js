
const  initSripe  = require("../stripe")
const stripe = initSripe()
//console.log(process.env.STRIPE_SECRET_KEY)



const getAllProducts = async(req, res) => {
    const products = await stripe.products.list({
        limit: 10,
        expand: ["data.default_price"],
    });
    res.json(products)
}

module.exports = { getAllProducts }
