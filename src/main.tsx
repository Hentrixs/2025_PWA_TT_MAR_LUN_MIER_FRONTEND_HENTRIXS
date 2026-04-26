import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import AuthContextProvider from './context/AuthContext/AuthContext.tsx'
import { ThemeContextProvider } from './context/ThemeContext/ThemeContext.tsx'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  // es un contexto global porque queremos saber desde cualquier parte de la app si el usuario esta loggeado.
  <ErrorBoundary>
    <ThemeContextProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  </ErrorBoundary>
);
