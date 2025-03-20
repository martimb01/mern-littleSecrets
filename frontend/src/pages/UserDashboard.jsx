import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CreatePostForm from './CreatePostForm'
import './css/postStyle.css'
import Logout from './components/Logout'
import PostsDisplay from './components/postsDisplay'

//Helper Functions
//Function to get user posts
const getUserPosts = async (setUserPosts) => {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:3000/post/fetchUserPosts', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setUserPosts(res.data.posts)
        console.log('Sucessful fetch of user posts!')


    } catch (err) {
        console.log('Somethings gone wrong getting the posts')
        console.log(err.message)
    }
}

//Function to get user details
const getUserDetails = async (setUserDetails) => {
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

// User dashboard component
const UserDashboard = () => {
    const [userDetails, setUserDetails] = useState(null)
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        getUserPosts(setUserPosts);
        getUserDetails(setUserDetails)
    }, [])
    
    return(
        <>
        {userDetails ? (
            <div>
            <h1>Welcome to your dashboardy, {userDetails.firstName + ' ' + userDetails.lastName}</h1>
            <p>{userDetails.email + ' ' + JSON.stringify(userDetails.dateOfBirth).substring(1, 11)}</p>
            </div>) : <h1>Loading...</h1>}
            <CreatePostForm />
            <br/>
            <PostsDisplay postDetails = {userPosts} />
            <Logout />
        </>
    )
}

export default UserDashboard