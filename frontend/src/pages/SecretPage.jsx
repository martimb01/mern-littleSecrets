import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { FaSquarePlus } from "react-icons/fa6";
import { getPosts } from "../apiHelpers";
import styles from './css/postsDisplayStyle.module.css'


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

            {posts && posts.length != 0 ? posts.map((post) => (
                <div key={post._id} className={styles.postCard} >
                {/* Header content */}
                <div className={styles.headerRow}>
                    <h3 className={styles.title}>{post.title}</h3>
                    {/* Right header content */}
                    <div className={styles.headerRight}>
                        <h3 className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</h3>
                    </div>
                </div>
                {/* Post content */}
                <p className={styles.content}>{post.content}</p>
                {/* Image if there is one */}
                {post.imgUrl && (
                <div className={styles.image}>
                    <img src={post.imgUrl} />
                </div>)}
        </div>
            )) : <p>No posts yet! Create the first one!</p>}
        </>
    )
}

export default SecretPage