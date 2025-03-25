import React, { useState, useEffect } from 'react'
import {getUserDetails, getPosts} from '../apiHelpers.js'
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
        getPosts(setUserPosts, 'personal')
    }

    useEffect(() => {
        getPosts(setUserPosts, 'personal');
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