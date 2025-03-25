import React from "react";
import { useLocation } from "react-router-dom";

const SecretPage = () => {
    const loc = useLocation()
    const {secretName, secretId, secretDescription} = loc.state
    return(
        <>
            {secretName && <h1>{secretName}</h1>}
            {secretId && <h1>{secretId}</h1>}
            {secretDescription && <p>{secretDescription}</p>}
        </>
    )
}

export default SecretPage