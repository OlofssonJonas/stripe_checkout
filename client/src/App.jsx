
import ProductPage from './components/ProductPage/ProductPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Confirmation from './components/Confirmation/Confirmation'
import UserContextProvider from './context/UserContext'
import ProductContextProvider from './context/ProductContext'
import "./App.css"
import Orders from './components/Orders/Orders'

function App() {
  return (
    <>
    <ProductContextProvider>
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/ordrar' element={<Orders />} />
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
