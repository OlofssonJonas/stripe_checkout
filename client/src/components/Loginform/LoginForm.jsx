
import { useContext } from 'react'
import "./LoginForm.css"
import { UserContext } from '../../context/UserContext'
import React from 'react'

const LoginForm = () => {
  const {setUsername, setEmail, existingUser, wrongUser ,setPassword, login, registration} = useContext(UserContext)


  
  return (
    <div className='login_header'> 
      <div>
        <h2>Logga in:</h2>
        <input type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Användarnamn' />
        <input type='text' onChange={e => setPassword(e.target.value)}placeholder='Lösenord' />
        <button onClick={login} className='login'>Logga in</button>
        {wrongUser ? <p>Fel användarnamn eller lösenord</p> : ''}  
        {/* varför jämför den inte lösenordet? */}
        </div>
        <div className='login-header-center'>
        <h2><u>MAC STORE</u></h2>
        <p>Just nu har vi en kampanj som ger dig 10% rabatt på ett köp om du skriver in koden <span>FALLSALE23</span></p>
        </div>
        <div>
        <h2>Skapa användare:</h2>
        <input type='text' onChange={e =>setUsername(e.target.value)} placeholder='Användare' />
        <input type='text' onChange={e => setEmail(e.target.value)} placeholder='E-mail' />
        <input type='text' onChange={e => setPassword(e.target.value)} placeholder='Lösenord' />
        <button onClick={registration} className='login'>Registrera dig</button>
        {existingUser ? <p>Användarnamnet finns redan</p> : ''}
        </div>
        
    </div>
  )
}

export default LoginForm