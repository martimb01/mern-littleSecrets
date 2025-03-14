import React from 'react'
import { useState } from 'react'

const RegisterForm =  () => {
    const [inputs, setInputs] = useState({})

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => {return {...values, [name]: value}})
        console.log(inputs)
    }
    return (
        <>
        <h1>Register form</h1>
        <form>
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
        </form>
        </>
    )
}

export default RegisterForm