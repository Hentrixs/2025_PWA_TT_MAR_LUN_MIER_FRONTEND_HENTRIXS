import { Routes, Route, useParams } from 'react-router-dom';
import RegisterScreen from './Components/RegisterScreen/RegisterScreen';
import LoginScreen from './Components/LoginScreen/LoginScreen';
import ResetPasswordRequestScreen from './Components/ResetPasswordRequestScreen/ResetPasswordRequestScreen';
import AuthMiddleware from './Middlewares/AuthMiddleware';
import HomeScreen from './Components/HomeScreen/HomeScreen';
import Workspace from './Components/Workspace/Workspace';

function App() {

  return (
    <Routes>
      <Route path={'/'} element={<h1>Pagina de inicio</h1>} />
      <Route path={'/login'} element={<LoginScreen />} />
      <Route path={'/register'} element={<RegisterScreen />} />
      <Route path={'/reset-password-request'} element={<ResetPasswordRequestScreen />} />
      <Route element={<AuthMiddleware />}>
        <Route path={'/home'} element={<HomeScreen />} />
        <Route path={'/workspace/:workspace_id'} element={<Workspace />} />
        {/* TODO= Crear un workspace y un workspace member y asociarlo al usuario */}
      </Route>
    </Routes>
  );
};

export default App;
