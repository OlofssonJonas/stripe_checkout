
const  initSripe  = require("../stripe")
const stripe = initSripe()
//console.log(process.env.STRIPE_SECRET_KEY)



const getAllProducts = async(req, res) => {
     const products = await stripe.products.list({
        expand: ["data.default_price"],
        active: true
    });
    res.status(200).json(products)
}

module.exports = { getAllProducts }
