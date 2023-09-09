
import { useContext, useState } from "react";
import "./checkout.css"
import { ProductContext } from "../../context/ProductContext";

function Checkout() {
  const  { cart, setCart, products, setProducts } = useContext(ProductContext)
  console.log(cart)
  
  async function handlePayment() {
    const response = await fetch(
      "http://localhost:3000/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({cart}),
      }
      );
      
      if (!response.ok) {
        return;
      }
      
      const { url } = await response.json();
      console.log(url)
      window.location = url;
    }
    
    
    return (
      <div className="checkout">
      <button className="cart_btn" onClick={handlePayment}>GO TO CHECKOUT</button>
    </div>
  );
}

export default Checkout;