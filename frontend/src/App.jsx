import React from "react";
import {Routes, Route} from 'react-router-dom'
import RegisterForm from "./pages/registerForm";
import LoginForm from "./pages/LoginForm";
const App = () => {
    return(
        <Routes>
            <Route path = '/register' element={<RegisterForm />} />
            <Route path = '/login' element={<LoginForm />} />
        </Routes>
    )
}

export default App