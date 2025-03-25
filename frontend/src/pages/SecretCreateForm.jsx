import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import NavBar from './components/NavBar';
import styles from './css/formStyle.module.css'


const SecretCreateForm = () => {
    const nav = useNavigate()
    const [inputs, setInputs] = useState({})
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setInputs({...inputs, [name]: value})
        console.log(inputs)
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();

        try{
           const token = localStorage.getItem('token')
           const res = await axios.post('http://localhost:3000/secret/create', inputs, {
            headers: {
                Authorization: `Bearer ${token}`
            }
           })
           console.log(res.data.message)
           setSuccessMessage(res.data.message)
           setTimeout(() => {nav('/allSecretsDisplay')}, 2000)
           setErrorMessage('')
        } catch (err) {
            console.log(err.response.data.message)
            setErrorMessage(err.response.data.message)
            setSuccessMessage('')
        }
    }

    return(
        <>
        <NavBar />
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formRow}>
                <label>Name</label>
                    <input type='text'
                    name='name'
                    value={inputs.name || ''}
                    onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
                <label>Password</label>
                    <input name='password'
                    value={inputs.password || ''}
                    onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
                <label>Description</label>
                    <textarea name='description'
                    value={inputs.description || ''}
                    onChange={handleChange} />
            </div>
            <button type="submit">Create Secret</button>
        </form>
        </>
    )
}

export default SecretCreateForm