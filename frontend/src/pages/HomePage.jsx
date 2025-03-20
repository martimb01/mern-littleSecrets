import React, { useState, useEffect } from 'react'
import {getUserDetails, getUserPosts} from '../apiHelpers.js'
import './css/postStyle.css'
import Logout from './components/Logout'
import PostsDisplay from './components/postsDisplay'
import  NavBar from  './components/NavBar'
import styles from './css/homepageStyle.module.css'
import './css/global.css'


// User dashboard component
const HomePage = () => {
    const [userDetails, setUserDetails] = useState(null)
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        getUserPosts(setUserPosts);
        getUserDetails(setUserDetails)
    }, [])
    
    return(
        <>
        <NavBar />
        <div className={styles.mainContainer}>
        {userDetails ? (
            <div>
            <h1>Welcome back, {userDetails.firstName + ' ' + userDetails.lastName}</h1>
            <p>{userDetails.email + ' ' + JSON.stringify(userDetails.dateOfBirth).substring(1, 11)}</p>
            </div>) : <h1>Loading...</h1>}
            <br/>
            <PostsDisplay postDetails = {userPosts} />
            <Logout />
            </div>
        </>
    )
}

export default HomePage