
const  initSripe  = require("../stripe")
const stripe = initSripe()
//console.log(process.env.STRIPE_SECRET_KEY)



const getAllProducts = async(req, res) => {
    const products = await stripe.products.list({
        limit: 5,
    });
    res.json(products)
}

module.exports = { getAllProducts }
