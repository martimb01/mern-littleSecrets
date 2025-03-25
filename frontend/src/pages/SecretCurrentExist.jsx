import React, { useEffect, useState } from "react";
import { getSecrets } from "../apiHelpers";
import NavBar from "./components/NavBar";

const SecretCurrentExist = () => {

    useEffect( () => {
        getSecrets()
    }, [])

    return (
        <>
        <NavBar />
        <p>Secrets list</p>
        </>
    )
}

export default SecretCurrentExist;