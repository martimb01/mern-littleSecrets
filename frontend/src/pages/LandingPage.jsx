import React, {useState} from "react"
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logov1.png'
import logoText from '../assets/logotextv0.png'
import  styles from './css/landingPageStyle.module.css'
import LoginForm from "./LoginForm"
const LandingPage = () =>{
    const nav = useNavigate()
    const [input, setInput] = useState('')

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInput({...input, [name]: value})
    }

    return(
        <>
        <div className={styles.loginBar}>
            <img src={logoText} />
            <form className={styles.loginForm}>
                <div className={styles.loginFormRow}>
                    <label>Username</label>
                    <input type="text"
                    name='username'
                    value={input.username || ''}
                    onChange={handleChange}></input>
                </div>

                <div className={styles.loginFormRow}>
                    <label>Password</label>
                    <input type="password"
                    name='password'
                    value={input.password || ''}
                    onChange={handleChange}></input>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
        <img src={logo} />
        </>
    )
}

export default LandingPage