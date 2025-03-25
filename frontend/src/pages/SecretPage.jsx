import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { FaSquarePlus } from "react-icons/fa6";
import { getPosts } from "../apiHelpers";


const SecretPage = () => {
    const loc = useLocation()
    const nav = useNavigate()
    const [posts, setPosts] = useState([])
    const {secretName, secretId, secretDescription} = loc.state

    useEffect(() => {
        getPosts(setPosts, 'shared', secretId)
    })

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


        </>
    )
}

export default SecretPage