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
        try {
            const { username, password, email } = req.body         
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
      // Handle file read errors, or file doesn't exist
      console.error(err);
    }

   
        user.stripeCustomerId = stripeCustomer.id

        users.push(user)

        fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
        res.json(({ success: true}))
       
    } catch (error) {
        console.log(error)
    }}

        //LOGIN
        const loginCustomer = async(req, res) => {
            console.log(req.session)
            const { username, password, email } = req.body
            try {
                const fileData = fs.readFileSync(filePath, 'utf8');
                const users = JSON.parse(fileData)
                const user = users.find((u) => u.username === username && u.email === email)
                if(!user) {
                    return res.status(404).json({ message: 'Du är inte behörig'})
                }

                const comparePassword = await bcrypt.compare(password, user.password)
                
                if(comparePassword) {
                    req.session = user
                    console.log("req", req.session)
                    res.json({ message: "login success", user: {username: user.username, email: user.email }})
                }
            } catch (error){
                console.log(error)
            }
        }

    module.exports = { registerCustomer, loginCustomer }