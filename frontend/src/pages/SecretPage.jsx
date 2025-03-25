import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import { FaSquarePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SecretPage = () => {
    const loc = useLocation()
    const nav = useNavigate()
    const {secretName, secretId, secretDescription} = loc.state


    const createPost = async() => {
        nav('/postCreation', {state: {secretId: secretId}})
    }
    
    return(
        <>
            <NavBar />
            {secretName && <h1>{secretName}</h1>}
            {secretId && <h1>{secretId}</h1>}
            {secretDescription && <p>{secretDescription}</p>}
            <FaSquarePlus onClick={createPost()} />
        </>
    )
}

export default SecretPage