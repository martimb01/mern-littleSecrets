import React from "react";
import {Routes, Route} from 'react-router-dom'
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import UserDashboard from "./pages/UserDashboard";
import CreatePostForm from "./pages/CreatePostForm";
import LandingPage from "./pages/LandingPage";
const App = () => {
    return(
        <>
        <Routes>
        <Route path = '/' element={<LandingPage />} />
            <Route path = '/register' element={<RegisterForm />} />
            <Route path = '/login' element={<LoginForm />} />
            <Route path = '/dashboard' element={<UserDashboard />} />
            <Route path = '/postCreation' element={<CreatePostForm />} />
        </Routes>
        </>
    )
}

export default App