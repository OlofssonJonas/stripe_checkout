
const initStripe = require ("../stripe")
const stripe = initStripe()
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, "..", "data", "orders.json")

const verifyPayment = async(req, res) => {
    try{
        const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

        if(session.payment_status !== "paid") {
            return res.status(400).json({verified: false})
        }     
        const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId)
        
        
        const order = {
            customer: session.customer_details.name,
            created: new Date(session.created * 1000).toLocaleDateString(),
            products: line_items.data.map(item => {
                return {
                    product: item.description,
                    price: item.price.unit_amount / 100,
                    quantity: item.quantity,
                }
            })            
        };
        
        let orders = []

        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            orders = JSON.parse(fileData);
          } catch (err) {
            console.error(err);
          }
            orders.push(order)

            fs.writeFileSync(filePath, JSON.stringify(orders, null, 2))

            res.status(200).json({ verified: true})
            
        } catch (error){
            console.log(error)
        }
    }

    //GET ORDERS
    const getOrders = (req, res) => {
        try{
            const fileData = fs.readFileSync(filePath, 'utf8');
            const orders = JSON.parse(fileData)
            const userOrders = orders.filter((order) => order.customer === req.params.id)
            res.status(200).json(userOrders)
        }catch(error){
            console.log(error)
        }
            }
                
        module.exports = { verifyPayment, getOrders }