
import LoginForm from './components/LoginForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Confirmation from './components/Confirmatiion'
import Checkout from './components/Checkout'
import UserContextProvider from './context/UserContext'

function App() {
  return (
    <>
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
       {/* <Route path="/" element={<Checkout />} /> */}
       <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
    <Checkout />
    {/* <LoginForm /> */}
    </UserContextProvider>
    </>
  )
}

export default App
