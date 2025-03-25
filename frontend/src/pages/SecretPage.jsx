import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { FaSquarePlus } from "react-icons/fa6";
import { getPosts } from "../apiHelpers";
import postStyles from './css/postsDisplayStyle.module.css'
import styles from './css/homepageStyle.module.css'



const SecretPage = () => {
    const loc = useLocation()
    const nav = useNavigate()
    const [posts, setPosts] = useState([])
    const {secretName, secretId, secretDescription} = loc.state

    useEffect(() => {
        getPosts(setPosts, 'shared', secretId)
    }, [])

    const createPost = async() => {
        nav('/postCreation', {state: {secretId: secretId, secretName: secretName}})
    }


    return(
        <>
            <NavBar />
            {secretName && <h1>{secretName}</h1>}
            {secretId && <h1>{secretId}</h1>}
            {secretDescription && <p>{secretDescription}</p>}
            <FaSquarePlus onClick={createPost} />
            <div className={styles.homepageContainer}>
                <div className={postStyles.postsContainer}>
                    {posts && posts.length != 0 ? posts.map((post) => (
                        <div key={post._id} className={postStyles.postCard} >
                            {/* Header content */}
                            <div className={postStyles.headerRow}>
                                <h3 className={postStyles.title}>{post.title}</h3>
                                {/* Right header content */}
                                <div className={postStyles.headerRight}>
                                    {/* Author first and last name */}
                                    <h3 className={postStyles.author}>{post.userId.firstName + ' ' +post.userId.lastName}</h3>
                                    <h3 className={postStyles.date}>{new Date(post.createdAt).toLocaleDateString()}</h3>
                                </div>
                            </div>
                            {/* Post content */}
                            <p className={postStyles.content}>{post.content}</p>
                            {/* Image if there is one */}
                            {post.imgUrl && (
                            <div className={postStyles.image}>
                                <img src={post.imgUrl} />
                            </div>)}
                        </div>
                    )) : <p>No posts yet! Create the first one!</p>}
                </div>
            </div>
        </>
    )
}

export default SecretPage