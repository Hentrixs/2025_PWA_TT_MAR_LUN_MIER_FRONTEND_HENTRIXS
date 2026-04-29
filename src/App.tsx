import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './Screens/Register/Register';
import Login from './Screens/Login/Login';
import ResetPasswordRequest from './Screens/ResetPasswordRequest/ResetPasswordRequest';
import ResetPasswordResult from './Screens/ResetPasswordResult/ResetPasswordResult';
import AuthMiddleware from './Middlewares/AuthMiddleware';
import Workspace from './Screens/Workspace/Workspace';
import Chat from './Screens/Chat/Chat';
import DirectChat from './Screens/DirectChat/DirectChat';
import VerifyEmail from './Screens/VerifyEmail/VerifyEmail';
import InviteRespond from './Screens/InviteRespond/InviteRespond';
import Home from './Screens/Home/Home';
import WorkspaceSelector from './Screens/WorkspaceSelector/WorkspaceSelector';
import CreateWorkspace from './Screens/CreateWorkspace/CreateWorkspace';
import Settings from './Screens/Settings/Settings';
import EmailConfirmationResult from './Screens/EmailConfirmationResult/EmailConfirmationResult';
import NotFoundScreen from './Screens/NotFoundScreen/NotFoundScreen';
import Egg from './Screens/Egg/Egg';

function App() {

  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/register'} element={<Register />} />
      <Route path={'/reset-password-request'} element={<ResetPasswordRequest />} />
      <Route path={'/reset-password-result'} element={<ResetPasswordResult />} />
      <Route path={'/verify-email'} element={<VerifyEmail />} />
      <Route path={'/invite/respond'} element={<InviteRespond />} />
      <Route path={'/egg'} element={<Egg />} />
      <Route element={<AuthMiddleware />}>
        <Route path={'/settings'} element={<Settings />} />
        <Route path={'/settings/email-confirmation-result'} element={<EmailConfirmationResult />} />
        <Route path={'/workspace-selector'} element={<WorkspaceSelector />} />
        <Route path={'/create-workspace'} element={<CreateWorkspace />} />
        <Route path={'/workspace'} element={<Workspace />} />
        <Route path={'/workspace/:workspace_id'} element={<Workspace />}>
          <Route path={'channel/:channel_id?'} element={<Chat />} />
          <Route path={'dm/:member_id'} element={<DirectChat />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default App;
