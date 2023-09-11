
import { useContext } from 'react'
import "./LoginForm.css"
import { UserContext } from '../../context/UserContext'
import React from 'react'

const LoginForm = () => {
  const { username, setUsername, email, setEmail, password, setPassword, login, registration,  data } = useContext(UserContext)


  
  return (
    <div className='login_header'> 
      <div>
        <h2>Logga in:</h2>
        <input type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Användarnamn' />
        <input type='text' onChange={e => setPassword(e.target.value)}placeholder='Lösenord' />
        <button onClick={login} className='login'>Logga in</button>
        </div>
        <h2><u>MAC STORE</u></h2>
        <div>
        <h2>Skapa användare:</h2>
        <input type='text' onChange={e =>setUsername(e.target.value)} placeholder='Användare' />
        <input type='text' onChange={e => setEmail(e.target.value)} placeholder='E-mail' />
        <input type='text' onChange={e => setPassword(e.target.value)} placeholder='Lösenord' />
        <button onClick={registration} className='login'>Registrera dig</button>
        </div>
        
    </div>
  )
}

export default LoginForm