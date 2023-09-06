
import { useContext } from 'react'

import { UserContext } from '../context/UserContext'


import React from 'react'

const LoginForm = () => {
  const { username, setUsername, login } = useContext(UserContext)
  //console.log(login)
  return (
    <>
        <h2>Logga in:</h2>
        <input type='text' placeholder='Användarnamn' />
        <input type='text' placeholder='Lösenord' />
        <button>Logga in</button>
        <h2>Skapa användare:</h2>
        <input type='text' placeholder='Användare' />
        <input type='text' placeholder='E-mail' />
        <input type='text' placeholder='Lösenord' />
        <button>Registrera dig</button>
        
    </>
  )
}

export default LoginForm