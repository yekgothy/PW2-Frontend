import React from 'react'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const LoginRequiredModal: React.FC = () => {
  const { showLoginPrompt, closeLoginPrompt } = useUser()
  const navigate = useNavigate()

  if (!showLoginPrompt) {
    return null
  }

  const handleLogin = () => {
    closeLoginPrompt()
    navigate('/login')
  }

  const handleRegister = () => {
    closeLoginPrompt()
    navigate('/register')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={closeLoginPrompt}
          className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
          aria-label="Cerrar"
        >
          <CloseIcon fontSize="small" />
        </button>
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Para comprar productos necesitas iniciar sesión</h2>
          <p className="text-sm text-gray-600">
            Inicia sesión o crea tu cuenta para agregar artículos al carrito y completar la simulación de compra.
          </p>
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleLogin}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-[#B974F4] py-3 text-sm font-semibold text-white transition hover:scale-105"
            >
              <LoginIcon fontSize="small" />
              <span>Ir a iniciar sesión</span>
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#B974F4] py-3 text-sm font-semibold text-[#B974F4] transition hover:bg-[#B974F4] hover:text-white"
            >
              <PersonAddAlt1Icon fontSize="small" />
              <span>Crear una cuenta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginRequiredModal
