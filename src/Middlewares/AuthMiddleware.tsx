import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext/AuthContext'
import { Navigate, Outlet } from 'react-router';

const AuthMiddleware = () => {
    const { isLogged } = useContext(AuthContext);
    return (
        <>
            {isLogged ? <Outlet /> : <Navigate to={'/login'} />}
        </>
    )
}

export default AuthMiddleware