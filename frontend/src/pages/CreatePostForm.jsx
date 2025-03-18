import React, {useState} from 'react'
import axios from 'axios'

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
        } catch (err) {
            console.log(err.response.data.message)
            setErrorMessage(err.response.data.message)
            setSuccessMessage('')
        }
    }

    return(
        <>
              <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
            <div className='form-row'>
                <label>Title</label>
                    <input type='text'
                    name='title'
                    value={inputs.title || ''}
                    onChange={handleChange} />
            </div>
            <br />
            <div className='form-row'>
                <label>Body</label>
                    <textarea name='content'
                    value={inputs.content || ''}
                    onChange={handleChange} />
            </div>
            <br />
            <button type="submit">Create Post!</button>
        </form>
        {successMessage ? <p>{successMessage}</p> : ''}
        {errorMessage ? <p>{errorMessage}</p> : ''}
        </>
    )
}

export default CreatePostForm