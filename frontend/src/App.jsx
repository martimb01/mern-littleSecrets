import React from "react";
import {Routes, Route} from 'react-router-dom'
import RegisterForm from "./pages/registerForm";
import LoginForm from "./pages/LoginForm";
import UserDashboard from "./pages/UserDashboard";
const App = () => {
    return(
        <Routes>
            <Route path = '/register' element={<RegisterForm />} />
            <Route path = '/login' element={<LoginForm />} />
            <Route path = '/dashboard' element={<UserDashboard />} />

        </Routes>
    )
}

export default App