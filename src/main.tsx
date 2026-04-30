import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ThemeContextProvider } from './context/ThemeContext/ThemeContext.tsx'
import { LanguageContextProvider } from './context/LanguageContext/LanguageContext.tsx'
import App from './App.tsx'
import AuthContextProvider from './context/AuthContext/AuthContext.tsx'
import { UserLanguageSync } from './context/LanguageContext/UserLanguageSync.tsx'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <ThemeContextProvider>
      <LanguageContextProvider>
        <BrowserRouter>
          <AuthContextProvider>
            <UserLanguageSync />
            <App />
          </AuthContextProvider>
        </BrowserRouter>
      </LanguageContextProvider>
    </ThemeContextProvider>
  </ErrorBoundary>
);
