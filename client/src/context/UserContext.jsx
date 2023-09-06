import React, { createContext, useState } from "react"

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    const [ username, setUsername ] = useState('Jonas')
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')

    
        const login = async() => {
            try {
                const response = await fetch("/api/customers/login")
                console.log(response)
                
            } catch (error) {
                console.log(error)
            }
        }
        
        return (
            <UserContext.Provider
            value={{ username, setUsername, password, setPassword, login }}>
        { children }
        </UserContext.Provider>
        )
        
    }

    export default UserContextProvider
    