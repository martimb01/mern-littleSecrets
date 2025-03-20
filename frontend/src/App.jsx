import React from "react";
import {Routes, Route} from 'react-router-dom'
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import HomePage from "./pages/HomePage";
import CreatePostForm from "./pages/CreatePostForm";
import LandingPage from "./pages/LandingPage";
import UpdateUserForm from "./pages/UpdateUserForm";
const App = () => {
    return(
        <>
        <Routes>
        <Route path = '/' element={<LandingPage />} />
            <Route path = '/register' element={<RegisterForm />} />
            <Route path = '/login' element={<LoginForm />} />
            <Route path = '/homepage' element={<HomePage />} />
            <Route path = '/postCreation' element={<CreatePostForm />} />
            <Route path = '/userUpdate' element={<UpdateUserForm />} />
        </Routes>
        </>
    )
}

export default App