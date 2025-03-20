import React from "react";

const PostsDisplay = ({postDetails}) => {
    return(
        <>
        {postDetails ? (
            postDetails.map((post) => (
                <div key={post._id} className='post-container'>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))) : <p>Loading...</p>}
        </>
    )
}

export default PostsDisplay