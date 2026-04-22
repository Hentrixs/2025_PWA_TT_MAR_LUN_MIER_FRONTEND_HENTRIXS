import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './Screens/Register/Register';
import Login from './Screens/Login/Login';
import ResetPasswordRequest from './Screens/ResetPasswordRequest/ResetPasswordRequest';
import AuthMiddleware from './Middlewares/AuthMiddleware';
import Workspace from './Screens/Workspace/Workspace';
import Chat from './Screens/Chat/Chat';
import VerifyEmail from './Screens/VerifyEmail/VerifyEmail';
import InviteRespond from './Screens/InviteRespond/InviteRespond';
import Home from './Screens/Home/Home';
import WorkspaceSelector from './Screens/WorkspaceSelector/WorkspaceSelector';
import CreateWorkspace from './Screens/CreateWorkspace/CreateWorkspace';
import Settings from './Screens/Settings/Settings';
import EmailConfirmationResult from './Screens/EmailConfirmationResult/EmailConfirmationResult';

function App() {

  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/register'} element={<Register />} />
      <Route path={'/reset-password-request'} element={<ResetPasswordRequest />} />
      <Route path={'/verify-email'} element={<VerifyEmail />} />
      <Route path={'/invite/respond'} element={<InviteRespond />} />
      <Route element={<AuthMiddleware />}>
        <Route path={'/settings'} element={<Settings />} />
        <Route path={'/settings/email-confirmation-result'} element={<EmailConfirmationResult />} />
        <Route path={'/workspace-selector'} element={<WorkspaceSelector />} />
        <Route path={'/create-workspace'} element={<CreateWorkspace />} /> {/* con exepcion del logo el responsive anda bien */}
        <Route path={'/workspace'} element={<Workspace />} />
        <Route path={'/workspace/:workspace_id'} element={<Workspace />}>
          <Route path={'channel/:channel_id?'} element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
