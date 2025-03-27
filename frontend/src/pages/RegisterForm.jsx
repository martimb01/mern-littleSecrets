import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './css/formStyle.module.css'


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
            console.log(inputs)
            const res = await axios.post('http://localhost:3000/user/register', inputs)
            console.log(JSON.stringify(res.data))
            setSuccessMessage(res.data.message + ' Redirecting to Login Page!')
            setErrorMessage('')
            setTimeout(() => { nav('/login') }, 3000)
        } catch (err) {
            console.log(inputs)
            console.log(err.response.data)
            setErrorMessage(err.response.data.message)
            setSuccessMessage('')
        }

    }

    return (
        <>
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <form className={styles.formContainer} onSubmit={handleRegister}>
        <h1>Register</h1>
            <div className={styles.formRow}>
                <label>Username *</label>
                    <input type='text'
                    name='username'
                    value={inputs.username || ''}
                    onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
                <label>Profile Image (URL)</label>
                    <input type='text'
                    name='profileImgUrl'
                    value={inputs.profileImgUrl || ''}
                    onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
                <label>First Name *</label>
                    <input type='text'
                    name='firstName'
                    value={inputs.firstName || ''}
                    onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
                <label>Last Name *</label>
                    <input type='text'
                    name='lastName'
                    value={inputs.lastName || ''}
                    onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
                <label>Date of Birth *</label>
                    <input type='date'
                    name='dateOfBirth'
                    value={inputs.dateOfBirth || ''}
                    onChange={handleChange} />
            </div>
            <br />
            <div className={styles.formRow}>
                <label>Email *</label>
                    <input type='text'
                    name='email'
                    value={inputs.email || ''}
                    onChange={handleChange} />
            </div>
            <br />
            <div className={styles.formRow}>
                <label>Password *</label>
                    <input type='password'
                    name='password'
                    value={inputs.password || ''}
                    onChange={handleChange} /> 
            </div>
            <br />
            <button type='submit'>Register</button>
            <div className={styles.formInfo}>
                <p>Username and password need to be atleast 5 characters long</p>
                <p>Fields with * are required</p>
            </div>
        </form>
        </>
    )
}

export default RegisterForm