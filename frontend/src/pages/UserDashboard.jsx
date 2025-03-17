import React, { useState, useEffect } from 'react'
import axios from 'axios'


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

    useEffect(() => {
        if (userDetails) {
            console.log(userDetails);
        }
    }, [userDetails]);
    
    return(
        <>
        <h1>Welcome to ur dashboard mah boy</h1>
        <p></p>
        </>
    )
}

export default UserDashboard