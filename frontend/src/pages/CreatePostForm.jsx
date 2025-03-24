import React, {useState} from 'react'
import axios from 'axios'
import NavBar from './components/NavBar';
import styles from './css/formStyle.module.css'

const CreatePostForm = () => {
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
           const res = await axios.post('http://localhost:3000/post/create', inputs, {
            headers: {
                Authorization: `Bearer ${token}`
            }
           })
           console.log(res.data.message)
           setSuccessMessage(res.data.message)
           setTimeout(() => {setSuccessMessage('')}, 2000)
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
                <label>Title</label>
                    <input type='text'
                    name='title'
                    value={inputs.title || ''}
                    onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
                <label>Image (url)</label>
                    <input name='imgUrl'
                    value={inputs.imgUrl || ''}
                    onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
                <label>Body</label>
                    <textarea name='content'
                    value={inputs.content || ''}
                    onChange={handleChange} />
            </div>
            <button type="submit">Create Post!</button>
        </form>

        </>
    )
}

export default CreatePostForm