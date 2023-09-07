
import { useState } from "react";
import "./checkout.css"

function Checkout() {
  const [cart, setCart] = useState([
    {
      product: "price_1Nn556JvLAcu8KHYDyfDSka3",
      quantity: 2,
    },
    {
      product: "price_1Nn544JvLAcu8KHYfBIUPegD",
      quantity: 1,
    },
  ]);

  async function handlePayment() {
    const response = await fetch(
      "http://localhost:3000/api/create-checkout-session",
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
      <button className="cart_btn" onClick={handlePayment}>GO TO CHECKOUT</button>
    </div>
  );
}

export default Checkout;