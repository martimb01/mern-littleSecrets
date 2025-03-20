import React from "react"
import { useNavigate } from 'react-router-dom'
const LandingPage = () =>{
    const nav = useNavigate()

    const handleRedirect = (event) => {
        const redirectTo =  event.target.name
        redirectTo === 'register' ? nav('/register') : nav('/login')
        
    }
    return(
        <>
        <h1>Welcome to Lil Secrets!</h1>
        <div>
            <button onClick={handleRedirect} name="register">Register</button>
            <button onClick={handleRedirect} name='login'>Login</button>
        </div>
        </>
    )
}

export default LandingPage