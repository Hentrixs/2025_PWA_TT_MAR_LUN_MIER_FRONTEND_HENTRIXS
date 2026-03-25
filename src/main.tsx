import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import AuthContextProvider from './context/AuthContext/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  // es un contexto global porque queremos saber desde cualquier parte de la app si el usuario esta loggeado.
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
)
