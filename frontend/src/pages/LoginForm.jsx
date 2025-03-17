import React from "react"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


const LoginForm = () => {
    const [inputs, setInputs] = useState({})
    const nav = useNavigate()
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const res = await axios.post('http://localhost:3000/user/login', inputs)
            console.log('LoggedIn!')
            setSuccessMessage(res.data.message)
            setTimeout(() => {nav('/dashboard')}, 3000)
        } catch (err) {
            console.log(err.response.data.devMessage)
            setErrorMessage(err.response.data.message)
            setTimeout(() => {setErrorMessage('')}, 2000)
        }
       

    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => {return {...values, [name]: value}})
        console.log(inputs)
    }

    return(
        <>
        <h1>Login Form</h1>
        <form onSubmit={handleLogin}>
            <label>username
                <input type='text'
                 name='username'
                 value={inputs.username || ''}
                 onChange={handleChange} />
            </label>
            <br />

            <br />
            <label> password
                <input type='password'
                 name='password'
                 value={inputs.password || ''}
                 onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Login!</button>
        </form>
        { successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        { errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
    )
}

export default LoginForm