import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext()

const ProductContextProvider = ({ children }) => {
    const [ products, setProducts ] = useState([])
    const [ cart, setCart ] = useState([])

    useEffect(() => {
  const getProducts = async() => {
    const response = await fetch('/api/list-products')
    const data = await response.json()
    setProducts(data.data)
  }
  getProducts()
    }, [])

    return (
        <ProductContext.Provider 
            value={{ products, setProducts, cart, setCart }}>
                { children }
        </ProductContext.Provider>
    )
}
export default ProductContextProvider