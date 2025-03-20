import React from "react"
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logov1.png'
const LandingPage = () =>{
    const nav = useNavigate()

    const handleRedirect = (event) => {
        const redirectTo =  event.target.name
        redirectTo === 'register' ? nav('/register') : nav('/login')
        
    }
    return(
        <>
        <h1>Welcome to Lil Secrets!</h1>
        <img src={logo} />
        <div>
            <button onClick={handleRedirect} name="register">Register</button>
            <button onClick={handleRedirect} name='login'>Login</button>
        </div>
        </>
    )
}

export default LandingPage