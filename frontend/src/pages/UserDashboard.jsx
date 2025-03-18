import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CreatePostForm from './CreatePostForm'


const UserDashboard = () => {
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.get('http://localhost:3000/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserDetails(res.data.user)
            } catch (err) {
                console.log('Somethings gone wrong getting the details')
                console.log(err.message)
            }
        }
        getUserDetails()
    }, [])
    
    return(
        <>
        {userDetails ? (
            <div>
            <h1>Welcome to your dashboard, {userDetails.username}</h1>
            <p>{userDetails.email}</p>
            </div>
            ) : <h1>Loading...</h1>}
            <CreatePostForm />
        </>
    )
}

export default UserDashboard