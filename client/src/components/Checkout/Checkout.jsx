
import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import "./checkout.css"
import { ProductContext } from "../../context/ProductContext";
import { UserContext } from "../../context/UserContext";
import Orders from "../Orders/Orders";

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
      
      const { url, sessionId } = await response.json();
      localStorage.setItem("session-id", sessionId)
      window.location = url;
    }
    
    
    return (
      <div className="checkout">
        {loggedInUserId ? <h3>Välkommen {data.username}</h3> : '' }
       { loggedInUserId ? <Link to="/ordrar">
        <button>Ordrar</button>
        </Link> : ''}
        {loggedInUserId ? <button className="cart_btn" onClick={handlePayment}>Gå till kassan</button> : <p>Logga in för att beställa</p>}
      
    </div>
  );
}

export default Checkout;