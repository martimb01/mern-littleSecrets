import React, { useState, useEffect } from 'react'
import {getUserDetails, getUserPosts} from '../apiHelpers.js'
import PostsDisplay from './components/PostsDisplay'
import  NavBar from  './components/NavBar'
import styles from './css/homepageStyle.module.css'
import './css/global.css'
import WelcomeCard from './components/WelcomeCard.jsx'


// User dashboard component
const HomePage = () => {
    const [userDetails, setUserDetails] = useState(null)
    const [userPosts, setUserPosts] = useState([])

    const refreshPosts = () => {
        getUserPosts(setUserPosts)
    }

    useEffect(() => {
        getUserPosts(setUserPosts);
        getUserDetails(setUserDetails)
    }, [])
    
    return(
        <>
        <NavBar />
        <div className={styles.homepageContainer}>
            <WelcomeCard userDetails={userDetails} />
            <PostsDisplay postDetails = {userPosts} refreshPosts={refreshPosts} />
        </div>
        </>
    )
}

export default HomePage