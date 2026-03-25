
/* 
Componente a nivel de ruta que checkea si el usuario tiene o no tiene sesion
En caso de no tener redirecciona a login
En caso de tener deja pasar
*/

import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext/AuthContext'
import { Navigate, Outlet } from 'react-router';

const AuthMiddleware = () => {
    const { isLogged, saveToken } = useContext(AuthContext);
    return (
        <> {/* Que era el outlet? */}
            {isLogged ? <Outlet /> : <Navigate to={'/login'} />}
        </>
    )
}

export default AuthMiddleware