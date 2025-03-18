import React from "react";
import {Routes, Route} from 'react-router-dom'
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import UserDashboard from "./pages/UserDashboard";
import WelcomePage from "./pages/WelcomePage";
import CreatePostForm from "./pages/CreatePostForm";
const App = () => {
    return(
        <>
        <Routes>
        <Route path = '/' element={<WelcomePage />} />
            <Route path = '/register' element={<RegisterForm />} />
            <Route path = '/login' element={<LoginForm />} />
            <Route path = '/dashboard' element={<UserDashboard />} />
            <Route path = '/postCreation' element={<CreatePostForm />} />
        </Routes>
        </>
    )
}

export default App