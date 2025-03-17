import React from "react";
import {Routes, Route} from 'react-router-dom'
import RegisterForm from "./pages/registerForm";
const App = () => {
    return(
        <Routes>
            <Route path = '/register' element={<RegisterForm />} />
        </Routes>
    )
}

export default App