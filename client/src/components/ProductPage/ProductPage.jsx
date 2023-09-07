import { useContext, useEffect } from 'react'
import { ProductContext } from '../../context/ProductContext'
import "./ProductPage.css"

const ProductPage = () => {
const { products, setProducts } = useContext(ProductContext)
console.log(products)


  return (
    <>
      <h1>Products in store:</h1>
        {products.map((product, idx) => (
        <div key={idx} className='products'>
        <h2>{product.name}</h2>
        <img src={product.images} />
        <p>{product.description}</p>
        <p>{(parseFloat(product.default_price.unit_amount) / 100).toFixed(2)} {product.default_price.currency}</p>
        <div className='store_btns'>
        <button className='buy_btn' >Buy now</button>
        <button>+</button>
        <button>-</button>
        </div>
        </div>
        ))} 
           </>

  )
}

export default ProductPage