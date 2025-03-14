import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RegisterForm from './pages/registerForm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegisterForm />
  </StrictMode>,
)
