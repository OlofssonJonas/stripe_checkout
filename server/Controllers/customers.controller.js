require('dotenv').config()
const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session')
const fs = require('fs')
const  initSripe  = require("../stripe")
const stripe = initSripe()
//console.log(process.env.STRIPE_SECRET_KEY)

const path = require('path')
const filePath = path.join(__dirname, "..", "data", "customers.json")

        //REGISTER
    const registerCustomer = async (req, res) => {
        const { username, password, email } = req.body         
        try {
            const existingCustomers = await stripe.customers.list({ email });
            if (existingCustomers.data.length > 0) {
              // Customer already exists, handle accordingly (e.g., show an error message)
              console.log('Customer already exists in Stripe');
              return;
            }

            //Hashed passWord
        const hashedPassword = await bcrypt.hash(password, 15)
        

            //create a user
        const user = {
            username,
            password: hashedPassword,
            email,
        }

        //Check if user exist goes here



        //create a stripe customer
        const stripeCustomer = await stripe.customers.create({
            name: user.username,
            email: user.email,
        })

        let users = [];
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      users = JSON.parse(fileData);
    } catch (err) {
      console.error(err);
    }

        user.stripeCustomerId = stripeCustomer.id

        users.push(user)

        fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
       res.status(200).json(({ success: true}))
       
    } catch (error) {
        console.log(error)
    }}

        //LOGIN
        const loginCustomer = async(req, res) => {
            const { username, password, email } = req.body
            try {
                const fileData = fs.readFileSync(filePath, 'utf8');
                const users = JSON.parse(fileData)
                const user = users.find((u) => u.username === username)
                if(!user) {
                    return res.status(404).json({ message: 'Fel användarnamn eller lösenord'})
                }

                const comparePassword = await bcrypt.compare(password, user.password)
                
                if(comparePassword) {
                    req.session = user
                    console.log("req", req.session)
                    res.status(200).json(user)
                }
            } catch (error){
                console.log(error)
            }
        }

    module.exports = { registerCustomer, loginCustomer }