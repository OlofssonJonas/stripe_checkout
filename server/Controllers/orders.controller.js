
const initStripe = require ("../stripe")
const stripe = initStripe()
const path = require('path')
const fs = require('fs')
const filePath = path.join(__dirname, "..", "data", "orders.json")

const verifyPayment = async(req, res) => {
    try{
        const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

        
        if(session.payment_status !== "paid") {
            return res.status(400).json({verified: false})
        }
        
        const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId)
        

            const order = {
                created: session.created,
                customer: session.customer_details.name,
                products: line_items.data.map(item => {
                    return {
                        product: item.description,
                        price: item.price.unit_amount / 100,
                        quantity: item.quantity,
                    }
                }) 
               
            };
            let orders = []
            // const fileData = fs.writeFileSync(filePath, 'utf8')
            // orders = JSON.parse(fileData)

            orders.push(order)

            fs.writeFileSync(filePath, JSON.stringify(orders, null, 2))

            res.status(200).json({ verified: true})
            
        } catch (error){
            console.log(error)
        }
    }
        module.exports = { verifyPayment }