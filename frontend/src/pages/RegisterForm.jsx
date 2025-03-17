import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './FormStyles.css'

const RegisterForm =  () => {
    const [inputs, setInputs] = useState({})
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const nav = useNavigate()

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => {return {...values, [name]: value}})
        console.log(inputs)
    }

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/user/register', inputs)
            console.log(JSON.stringify(res.data))
            setSuccessMessage(res.data.message + ' Redirecting to Login Page!')
            setErrorMessage('')
            setTimeout(() => { nav('/login') }, 3000)
        } catch (err) {
            console.log(err.response.data)
            setErrorMessage(err.response.data.message)
            setSuccessMessage('')
        }

    }

    return (
        <>
        <h1>Register form</h1>
        <form onSubmit={handleRegister}>
            <div className='form-row'>
                <label>username</label>
                    <input type='text'
                    name='username'
                    value={inputs.username || ''}
                    onChange={handleChange} />
            </div>
            <br />
            <div className='form-row'>
                <label>email</label>
                    <input type='text'
                    name='email'
                    value={inputs.email || ''}
                    onChange={handleChange} />
            </div>
            <br />
            <div className='form-row'>
                <label>password</label>
                    <input type='password'
                    name='password'
                    value={inputs.password || ''}
                    onChange={handleChange} /> 
            </div>
            <br />
            <button type="submit">Register!</button>
        </form>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
    )
}

export default RegisterForm