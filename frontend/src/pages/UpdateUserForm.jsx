import React, { useState } from "react";
import axios from 'axios'
import NavBar from "./components/NavBar";
import styles from './css/formStyle.module.css'

const UpdateUserForm = () => {
    const [inputs,setInputs] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs({...inputs, [name]: value})
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const res = await axios.put('http://localhost:3000/user/update', inputs, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSuccessMessage(res.data.message)
            setErrorMessage('')
        } catch (err) {
                console.log(err.response.data.message);
                setErrorMessage(err.response.data.message);
                setSuccessMessage('')
        }
    }
    return (
        <>
        <NavBar />
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <form onSubmit={handleUpdate} className={styles.formContainer}>
            <div className={styles.formRow}>
                <label>Username</label>
                    <input type='text'
                    name='username'
                    value={inputs.username || ''}
                    onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
                <label>First Name</label>
                    <input type='text'
                    name='firstName'
                    value={inputs.firstName || ''}
                    onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
                <label>Last Name</label>
                    <input type='text'
                    name='lastName'
                    value={inputs.lastName || ''}
                    onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
                <label>Date of Birth</label>
                    <input type='date'
                    name='dateOfBirth'
                    value={inputs.dateOfBirth || ''}
                    onChange={handleChange} />
            </div>
            <br />
            <div className={styles.formRow}>
                <label>Email</label>
                    <input type='text'
                    name='email'
                    value={inputs.email || ''}
                    onChange={handleChange} />
            </div>
            <br />
            <div className={styles.formRow}>
                <label>Password</label>
                    <input type='password'
                    name='password'
                    value={inputs.password || ''}
                    onChange={handleChange} /> 
            </div>
            <div className={styles.formRow}>
                <label>Profile Image Url</label>
                    <input type='text'
                    name='profileImgUrl'
                    value={inputs.profileImgUrl || ''}
                    onChange={handleChange} /> 
            </div>
            <br />
            <button type="submit">Update!</button>
        </form>
        </>
    )
}

export default UpdateUserForm