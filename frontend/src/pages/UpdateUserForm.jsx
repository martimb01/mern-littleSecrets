import React, { useState } from "react";
import axios from 'axios'
import NavBar from "./components/NavBar";

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
        <h1>Update user</h1>
        <form onSubmit={handleUpdate}>
            <div className='form-row'>
                <label>Username</label>
                    <input type='text'
                    name='username'
                    value={inputs.username || ''}
                    onChange={handleChange} />
            </div>
            <div className='form-row'>
                <label>First Name</label>
                    <input type='text'
                    name='firstName'
                    value={inputs.firstName || ''}
                    onChange={handleChange} />
            </div>
            <div className='form-row'>
                <label>Last Name</label>
                    <input type='text'
                    name='lastName'
                    value={inputs.lastName || ''}
                    onChange={handleChange} />
            </div>
            <div className='form-row'>
                <label>Date of Birth</label>
                    <input type='date'
                    name='dateOfBirth'
                    value={inputs.dateOfBirth || ''}
                    onChange={handleChange} />
            </div>
            <br />
            <div className='form-row'>
                <label>Email</label>
                    <input type='text'
                    name='email'
                    value={inputs.email || ''}
                    onChange={handleChange} />
            </div>
            <br />
            <div className='form-row'>
                <label>Password</label>
                    <input type='password'
                    name='password'
                    value={inputs.password || ''}
                    onChange={handleChange} /> 
            </div>
            <div className='form-row'>
                <label>Profile Image Url</label>
                    <input type='text'
                    name='profileImgUrl'
                    value={inputs.profileImgUrl || ''}
                    onChange={handleChange} /> 
            </div>
            <br />
            <button type="submit">Update!</button>
        </form>
        {successMessage ? successMessage : errorMessage}
        {}
        </>
    )
}

export default UpdateUserForm