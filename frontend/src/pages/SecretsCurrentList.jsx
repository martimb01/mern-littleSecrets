import React, { useEffect, useState } from "react";
import { getSecrets } from "../apiHelpers";
import NavBar from "./components/NavBar";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import styles from './css/secretsCurrentListStyle.module.css'
import logo from '../assets/logov0white.png'

const SecretsCurrentList = () => {
    const nav = useNavigate()
    const [secrets, setSecrets] = useState()
    const [inputs, setInputs] = useState('')
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
            setSuccessMessage(res.data.message)
            setErrorMessage('')


            //Passes that particular secret name, description and id with state
            setTimeout(() => {
                nav('/secretPage', {state: {secretName: res.data.secretName, 
                                                  secretDescription: res.data.secretDescription , 
                                                  secretId: res.data.secretId}})
                            }, 2000)

        } catch (err) {
            if(err.response){
                console.log(err.response.data.message)
                setErrorMessage(err.response.data.message)
                setSuccessMessage('')
                setTimeout(() => {setErrorMessage('')}, 2000)
            } else {
                console.log("Error:", err.message);
            }
            
        }
    }

    return (
        <>
        <NavBar />
        <div className={styles.welcomeCard}>
            <h1>What is this?</h1>
            <p>Secrets are shared pages where only people with access to them can post!</p>
            <h2 onClick={() => {nav('/secretCreation')}}>Want to create your own? Click here!</h2>
        </div>

        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <div className={styles.secretContainer}>
            {secrets && secrets.length !=0 ? secrets.slice().reverse().map((secret) => (
                <div key={secret._id} className={styles.secretCard}>
                    <form onSubmit={(event) => handleSubmit(event, secret)}>
                        <div className={styles.header}>
                            <img src={logo} alt="shhhhh" />
                            <h1>{secret.name}</h1>
                        </div>

                        <div className={styles.formRow}>
                            <input type="password"
                                onChange={(event) => handleInputs(event, secret._id)}
                                name="password"
                                value={inputs[secret._id] || ''}>
                            </input>
                            <button type="submit">Enter</button>
                        </div>
                    </form>
                </div>  
            )) : <h2 className={styles.noSecrets}>No secrets yet! Be the first one to create some!</h2>}
        </div>
        </>
    )
}

export default SecretsCurrentList;