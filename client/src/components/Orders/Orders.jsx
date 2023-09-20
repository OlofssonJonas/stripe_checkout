import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import "./Orders.css"


const Orders = () => {
    const { username } = useContext(UserContext)
    const [ orders, setOrders ] = useState([])
    const [ loading, setLoading ] = useState(false)
    
    useEffect(() => {
        const getOrders = async() => {
            try{
                const response = await fetch(`http://localhost:3000/api/getorders/${username}`)
                const data = await response.json()
                setOrders(data)
            }catch(error) {
                console.log(error)
            }
        }   
        getOrders()
    },[])
    
    console.log(orders)
    return (
      <div  className='orderContent'>
        <h1><u>Ordrar</u></h1>
        <div>
        {loading ? (
            <p>Loading...</p>
        ) : (
            orders.map((order, idx) => (
                <div key={idx} className='customer'>
                    <h3>Customer: {order.customer}</h3>
                    <h3>Created: {order.created}</h3>
                    {order.products.map((product, idx) => (
                        <div key={idx} className='products'>
                            <h3>{product.product}, {product.price} SEK  x {product.quantity}</h3>
                            </div>
                    ))}
                </div>
            ))
        )}
       </div>
    </div>
    )
}
export default Orders