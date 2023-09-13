import React, { createContext, useState } from "react"

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ data, setData ] = useState({})
    const [ existingUser, setExistingUser ] = useState('')
    const [ wrongUser, setWrongUser ] = useState('')
    const [ registerUser, setRegisterUser ] = useState('')
    

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

                const data = await response.json()

                setWrongUser(response.status === 401)
                setData(data) 
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

             setExistingUser(response.status === 404)
             setRegisterUser(response.status === 200)
            } catch (error) {
                console.log(error)
            }
        }


        
        return (
            <UserContext.Provider
            value={{ username, setUsername, password, setPassword, email, setEmail, data, login, wrongUser, registerUser, existingUser, registration }}>
        { children }
        </UserContext.Provider>
        )
        
    }

    export default UserContextProvider
    