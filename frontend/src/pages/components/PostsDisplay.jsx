import React from "react";
import styles from '../css/postStyle.module.css'
import { TiDelete } from "react-icons/ti";
import axios from 'axios'

const PostsDisplay = ({postDetails, refreshPosts}) => {

    const handleDelete = async (postToDeleteId) => {
        try {
            console.log(postDetails)
            const token = localStorage.getItem('token')
        await axios.delete('http://localhost:3000/post/delete', {
            data: {id: postToDeleteId},
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            console.log('The delete button worked!')
            refreshPosts();
        } catch (err) {
            console.log(err.response.data)
            console.log('The delete button did not work :(')
        }
    }

    return(
        <div className={styles.mainContainer}>
        {postDetails ? (
            postDetails.map((post) => (
                <div key={post._id} className={styles.postCard} >
                    <h3>{post.title}</h3>
                    <h3>{new Date(post.createdAt).toLocaleDateString()}</h3>
                    <h3 className={styles.deleteIcon} onClick={() => {handleDelete(post._id)}}><TiDelete /></h3>
                    <p>{post.content}</p>
                    {post.imgUrl && <img src={post.imgUrl} />}
                </div>
            ))) : <p>Loading...</p>}
        </div>
    )
}

export default PostsDisplay