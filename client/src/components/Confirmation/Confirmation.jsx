import React, { useEffect, useState } from 'react'
import { AiOutlineCoffee } from 'react-icons/ai'

const Confirmation = () => {
  const [ isPaymentVeried, setIsPaymentVerified ] = useState(false)

  useEffect(() => {
    const sessionId = localStorage.getItem("session-id")
    const verifyPayment = async() => {
      const response = await fetch(
        "/api/verify-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({sessionId}),
        }
        );
        const { verified } = await response.json()

        if(verified) {
          setIsPaymentVerified(true)
          localStorage.removeItem("session-id")
        } else {
          setIsPaymentVerified(false)
        }

    } 
    verifyPayment()
  }, [])

  return (
    isPaymentVeried ? <h1>Tack för ditt köp, ta en kopp <AiOutlineCoffee /> och invänta din beställning</h1> : <h1>Nåt gick fel</h1>
  )
}

export default Confirmation