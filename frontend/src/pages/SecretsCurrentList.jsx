import React, { useEffect, useState } from "react";
import { getSecrets } from "../apiHelpers";
import NavBar from "./components/NavBar";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import styles from './css/secretsCurrentListStyle.module.css'

const SecretsCurrentList = () => {
    const nav = useNavigate()
    const [secrets, setSecrets] = useState()
    const [inputs, setInputs] = useState('')

    useEffect( () => {
        getSecrets(setSecrets)
    }, [])

    const handleInputs = (event, secretId) => {
        const value = event.target.value
        setInputs({...inputs, [secretId]: value})
    }

    const handleSubmit = async (event, secret) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post(
                'http://localhost:3000/secret/verify',
                {
                    name: secret.name,
                    password: inputs[secret._id],
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log(res.data.message)

            //Passes that particular secret name, description and id with state
            nav('/secretPage', {state: {secretName: res.data.secretName, secretDescription: res.data.secretDescription , secretId: res.data.secretId}})

        } catch (err) {
            if(err.response){
                console.log(err.response.data.message)
            } else {
                console.log("Error:", err.message);
            }
            
        }
    }

    return (
        <>
        <NavBar />
        <div className={styles.secretContainer}>
            {secrets && secrets.map((secret) => (
                <div key={secret._id} className={styles.secretCard}>
                    <form onSubmit={(event) => handleSubmit(event, secret)}>
                        <h1>{secret.name}</h1>

                        <input type="password"
                            onChange={(event) => handleInputs(event, secret._id)}
                            name="password"
                            value={inputs[secret._id] || ''}>
                        </input>

                        <button type="submit">Enter</button>
                    </form>
                </div>  
            ))}
        </div>
        <h2 onClick={() => {nav('/secretCreation')}}>Create a new secret!</h2>
        </>
    )
}

export default SecretsCurrentList;