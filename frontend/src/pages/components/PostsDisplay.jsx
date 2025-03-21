import React from "react";
import styles from '../css/postsDisplayStyle.module.css'
import { TiDelete } from "react-icons/ti";
import axios from 'axios'

const PostsDisplay = ({postDetails, refreshPosts}) => {

    const handleDelete = async (postToDeleteId) => {
        try {
            const token = localStorage.getItem('token')
        await axios.delete('http://localhost:3000/post/delete', {
            data: {id: postToDeleteId},
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            console.log('The delete button worked!')
            refreshPosts(); //Passed by the HomePage main container so it refreshes posts after a successful deletion
        } catch (err) {
            console.log(err.response.data)
            console.log('The delete button did not work :(')
        }
    }

    return(
        <div className={styles.postsContainer}>
        {postDetails && postDetails.length != 0 ? (
            postDetails.map((post) => (
                <div key={post._id} className={styles.postCard} >
                    <h3>{post.title}</h3>
                    <h3>{new Date(post.createdAt).toLocaleDateString()}</h3>
                    <h3 className={styles.deleteIcon} onClick={() => {handleDelete(post._id)}}><TiDelete /></h3>
                    <p>{post.content}</p>
                    {post.imgUrl && <img src={post.imgUrl} />}
                </div>
            ))) : <h2>No posts yet! Create one!</h2>}
        </div>
    )
}

export default PostsDisplay