import React, {useState} from "react"
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logov1.png'
import logoText from '../assets/logotextv0.png'
import  styles from './css/landingPageStyle.module.css'
import axios from 'axios'
import RegisterForm from './RegisterForm'

const LandingPage = () =>{
    const nav = useNavigate()
    const [input, setInput] = useState('')
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInput({...input, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await axios.post('http://localhost:3000/user/login', input)
            console.log('LoggedIn!', res.data.token)
            localStorage.setItem('token', res.data.token)
            setSuccessMessage(res.data.message)
            setTimeout(() => {nav('/homepage')}, 3000)

        } catch (err) {
            console.log(err.response.data.devMessage)
            setErrorMessage(err.response.data.message)
            setTimeout(() => {setErrorMessage('')}, 2000)
        }
        
    }

    return(
        <>
        <div className={styles.loginBar}>
            <img src={logoText} />
            <form className={styles.loginForm} onSubmit={handleSubmit}>
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
        

        <div className={styles.mainContainer}>
        <p className={styles.register} onClick={() => {nav('/register')}}>Dont have an account? Create one today!</p>
            <img src={logo} className={styles.welcomeImg} />
        </div>
        </>
    )
}

export default LandingPage