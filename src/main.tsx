import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import AuthContextProvider from './context/AuthContext/AuthContext.tsx'
import { ThemeContextProvider } from './context/ThemeContext/ThemeContext.tsx'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
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
