import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext()

const ProductContextProvider = ({ children }) => {
    const [ products, setProducts ] = useState([])
    const [ cart, setCart ] = useState([
        {
          product: products.price,
          quantity: products.quantity,
        }
    ])

    useEffect(() => {
  const getProducts = async() => {
    const response = await fetch('http://localhost:3000/api/list-products')
    const data = await response.json()
    setProducts(data.data)
  }
  getProducts()
  }, [])  //products i hakparantesen gör konstiga saker

    return (
        <ProductContext.Provider 
            value={{ products, setProducts, cart, setCart }}>
                { children }
        </ProductContext.Provider>
    )
}
export default ProductContextProvider