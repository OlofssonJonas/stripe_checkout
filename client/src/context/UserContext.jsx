import React, { createContext, useState } from "react"

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ data, setData ] = useState({})

            //LOGIN
        const login = async() => {
            try {
                const response = await fetch("/api/customers/login", {
                    method: "POST",
                    headers : {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username: username, password: password })
                });
                console.log(response)
                const data = await response.json()
                setData(data)
                    
                console.log(data)          
            } catch (error) {
                console.log(error)
            }
        }

            //REGISTRATION
        const registration = async() => {
            try {
                const response = await fetch('/api/customers/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username: username, password: password, email: email })
                })
                const data = await response.json()
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }


        
        return (
            <UserContext.Provider
            value={{ username, setUsername, password, setPassword, email, setEmail, data, login, registration }}>
        { children }
        </UserContext.Provider>
        )
        
    }

    export default UserContextProvider
    