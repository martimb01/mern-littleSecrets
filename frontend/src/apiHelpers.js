import axios from 'axios'

//Function to get user posts
export const getUserPosts = async (setUserPosts) => {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:3000/post/fetchUserPosts', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setUserPosts(res.data.posts)
        console.log('Sucessful fetch of user posts!')


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
export const getSecrets = async () => {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:3000/secret/fetchSecrets', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.message)
        console.log(JSON.stringify(res.data.secrets))

    } catch (err) {
        console.log(err.response.data)
    }
}
