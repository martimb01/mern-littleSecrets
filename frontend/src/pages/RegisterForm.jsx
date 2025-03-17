import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const RegisterForm =  () => {
    const [inputs, setInputs] = useState({})

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => {return {...values, [name]: value}})
        console.log(inputs)
    }

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/user/register', inputs)
            console.log(JSON.stringify(response.data))
        } catch (err) {
            console.log(err.message)
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
        </>
    )
}

export default RegisterForm