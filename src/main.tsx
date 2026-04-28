import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ThemeContextProvider } from './context/ThemeContext/ThemeContext.tsx'
import App from './App.tsx'
import AuthContextProvider from './context/AuthContext/AuthContext.tsx'
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
