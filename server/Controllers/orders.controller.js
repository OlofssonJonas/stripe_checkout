
const initStripe = require ("../stripe")
const stripe = initStripe()

const verifyPayment = async(req, res) => {
    console.log(req.body.sessionId)
    res.status(200).json('Det här gick ju bra:) ')

}
module.exports = { verifyPayment }