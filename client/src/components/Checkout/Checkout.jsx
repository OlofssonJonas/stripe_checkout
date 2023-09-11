
import { useContext, useState } from "react";
import "./checkout.css"
import { ProductContext } from "../../context/ProductContext";
import { UserContext } from "../../context/UserContext";

function Checkout() {
  const  { cart, setCart, products, setProducts } = useContext(ProductContext)
  const  { data } = useContext(UserContext)
  const loggedInUserId = data.stripeCustomerId
  
  async function handlePayment() {
    const response = await fetch(
      "/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
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
        {loggedInUserId ? <h3>Välkommen {data.username}</h3> : '' }
        {loggedInUserId ? <button className="cart_btn" onClick={handlePayment}>Gå till kassan</button> : <p>Logga in för att beställa</p>}
      
    </div>
  );
}

export default Checkout;