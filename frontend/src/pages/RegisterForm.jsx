import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const RegisterForm =  () => {
    const [inputs, setInputs] = useState({})
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
            setSuccessMessage(JSON.stringify(res.data.message))
            setErrorMessage('')
        } catch (err) {
            console.log(err.response.data)
            setErrorMessage(JSON.stringify(err.response.data.message))
            setSuccessMessage('')
        }

    }

    return (
        <>
        <h1>Register form</h1>
        <form onSubmit={handleRegister}>
            <label>username
                <input type='text'
                 name='username'
                 value={inputs.username || ''}
                 onChange={handleChange} />
            </label>
            <br />
            <label>email
                <input type='text'
                 name='email'
                 value={inputs.email || ''}
                 onChange={handleChange} />
            </label>
            <br />
            <label> password
                <input type='password'
                 name='password'
                 value={inputs.password || ''}
                 onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Register!</button>
        </form>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
    )
}

export default RegisterForm