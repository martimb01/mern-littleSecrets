import axios from 'axios'

//Function to get posts
export const getPosts = async (setUserPosts, type, secretId = null) => {
    try {
        const token = localStorage.getItem('token')

        const url = secretId ? `http://localhost:3000/post/fetchPosts/${type}?secretId=${secretId}`
                             : `http://localhost:3000/post/fetchPosts/${type}`

        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setUserPosts(res.data.posts)
        console.log('Sucessful fetch of user posts!')
        console.log(res.data.posts)


    } catch (err) {
        console.log('Somethings gone wrong getting the posts')
        console.log(err.message)
    }
}

//Function to get user details
 export const getUserDetails = async (setUserDetails) => {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:3000/user/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUserDetails(res.data.user)
    } catch (err) {
        console.log('Somethings gone wrong getting the details')
        console.log(err.message)
    }
}

//Function to get all Secret Pages
export const getSecrets = async (setSecrets) => {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:3000/secret/fetchSecrets', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setSecrets(res.data.secrets)
        console.log(res.data.message)

    } catch (err) {
        console.log(err.response.data)
    }
}
