
import ProductPage from './components/ProductPage/ProductPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Confirmation from './components/Confirmation/Confirmation'
import Checkout from './components/Checkout/Checkout'
import UserContextProvider from './context/UserContext'
import ProductContextProvider from './context/ProductContext'
import "./App.css"

function App() {
  return (
    <>
    <ProductContextProvider>
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<ProductPage />} /> 
       <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
    </ProductContextProvider>
    
    </>
    )
}

export default App
