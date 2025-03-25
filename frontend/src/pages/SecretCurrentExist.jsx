import React, { useEffect, useState } from "react";
import { getSecrets } from "../apiHelpers";
import NavBar from "./components/NavBar";

const SecretCurrentExist = () => {
    const [secrets, setSecrets] = useState()

    useEffect( () => {
        getSecrets(setSecrets)
    }, [])

    return (
        <>
        <NavBar />
        {}
        </>
    )
}

export default SecretCurrentExist;