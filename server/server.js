require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require('cookie-session')
const { userRouter } = require("./Routes/customers.routes");
const  initStripe  = require("./stripe")
const stripe = initStripe()
const { checkoutRouter } = require("./Routes/checkout.routes")
const { customerRouter } = require("./Routes/customers.routes");
const { productRouter } = require('./Routes/products.routes');
const { verifyRouter } = require("./Routes/order.routes");


const app = express();
app.use(express.json());


//Middlewares
app.use(
  cors({
    origin: "*",
  })
  );
  
  app.use(
    cookieSession({
      name: "session",
      keys: ["aVeryS3cr3tK3y"],
      maxAge: 1000 * 60 * 60 * 24, // 24 Hours
      sameSite: "strict",
      httpOnly: true,
      secure: false,
    })
    );
  
  app.use("/api", customerRouter)
  app.use("/api", productRouter)
  app.use("/api", checkoutRouter)
  app.use("/api", verifyRouter)


app.listen(3000, () => console.log("Server is up and running port 3000.."));
