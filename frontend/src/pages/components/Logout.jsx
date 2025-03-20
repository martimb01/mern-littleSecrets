import React from "react";
import {useNavigate}  from 'react-router-dom'

const Logout = () => {
    const nav  = useNavigate()
    const  handleLogout = () => {
        localStorage.removeItem('token')
        console.log('Removed user token from local storage')
        nav('/')
    }
    return(
        <button onClick={handleLogout}>LogOut!</button>
    )
}

export default Logout