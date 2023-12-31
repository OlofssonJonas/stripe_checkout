require('dotenv').config()
const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session')
const fs = require('fs')
const  initStripe  = require("../stripe")
const stripe = initStripe()

const path = require('path')
const filePath = path.join(__dirname, "..", "data", "customers.json")

        //REGISTER
    const registerCustomer = async (req, res) => {
        const { username, password, email } = req.body         
        try {
            const existingCustomers = await stripe.customers.list({ email });
            if (existingCustomers.data.length > 0) {
              res.status(404).json('User already exist')
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
                    return res.status(401).json({ message: 'Fel användarnamn eller lösenord'})
                }

                const comparePassword = await bcrypt.compare(password, user.password)
                
                if(comparePassword) {
                    req.session = user
                    res.status(200).json(user)
                }else {
                    res.status(401).json('Wrong username or password')
                }
            } catch (error){
                console.log(error)
            }
 
        }

    module.exports = { registerCustomer, loginCustomer }