import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductContext'
import "./ProductPage.css"
import LoginForm from '../Loginform/LoginForm'
import Checkout from '../Checkout/Checkout'

const ProductPage = () => {
const { products, setProducts, cart, setCart } = useContext(ProductContext)
//const [ cart, setCart ] = useState([])
console.log(cart)
//console.log(products)


const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        console.log(updatedCart)
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
}

  const removeFromCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // If the product is already in the cart
      if (existingProduct.quantity > 1) {
        // Decrease the quantity by 1
        const updatedCart = cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
      } else {
        // Remove the product from the cart if the quantity is 1 or less
        const updatedCart = cart.filter(item => item.id !== product.id);
        setCart(updatedCart);
      }
    }
  };
  return (
    <>
    <LoginForm />
    <Checkout />
    <div className='product-header'>
      <h1>Products in store:</h1>
      </div>
      <div className='product-content'>
      
        <div >
        {products.map((product, idx) => (
          <div key={idx} className='left-side'>
        <h2>{product.name}</h2>
        <img src={product.images} />
        <p>{product.description}</p>
        <p>{(parseFloat(product.default_price.unit_amount) / 100).toFixed(2)} {product.default_price.currency}</p>
      <div className='store_btns'>
        <button className='buy_btn' onClick={() => addToCart(product)}>Buy now</button>
        <button onClick={() => removeFromCart(product)}>Remove from cart</button>
      </div> 
          </div>
        ))} 
        </div>
        <div>
          <h1>Varukorg:</h1>
          <div>
          {cart.map((c, idx) => (
            <div key={idx} className='right-side'>
            <p><span>{c.name}</span> X {c.quantity}</p>
            <img src={c.images}></img>
            </div>
          ))}
          </div>
      </div>
      </div>
           </>

  )
}

export default ProductPage