import { Routes, Route } from 'react-router-dom'
import './App.css';
import ChangePassword from './components/auth/ChangePassword';
import Login from './components/auth/Login';
import ResetPassword from './components/auth/ResetPassword';
import RequireAuth from './components/layout/RequireAuth';
import PublicLayout from './components/layout/Public';
import PageNotFound from './components/pages/pageNotFound/PageNotFound';
import Reports from './components/pages/reports/Reports';
import Dashboard from './components/pages/dashboard/Dashboard';
import Entities from './components/pages/entities/Entities';
import BoardMeetings from './components/pages/boardMeetings/BoardMeetings';
import Teams from './components/pages/teams/Teams';
import Tasks from './components/pages/task/Tasks';
import Settings from './components/pages/settings/Settings';
import Users from './components/pages/users/Users';
import UserProfile from './components/pages/userProfile/UserProfile';
import EntityForm from './components/createForm/createEntityForm/EntityForm';
import UserForm from './components/createForm/createUserForm/UserForm';
import BoardMeetingForm from './components/createForm/createBoardMeetingForm/BoardMeetingForm';
import MyCalendar from './components/pages/task/MyCalendar';
import UserTasks from './components/pages/userProfile/userTabs/UserTasks';
import UserTeams from './components/pages/userProfile/userTabs/UserTeams';
import UserEntities from './components/pages/userProfile/userTabs/UserEntities';
import EntityLandingPage from './components/landingPages/entity/EntityLandingPage';
import Communication from './components/pages/settings/SettingsComponents/Communication/Communication';
import OrganizationProfile from './components/pages/settings/SettingsComponents/Organizationprofile/Oranizationprofiles';
import Roles from './components/pages/settings/SettingsComponents/Roles/Roles';
import Forms from './components/pages/settings/SettingsComponents/Forms/Forms';
import Whatsapp from './components/pages/settings/SettingsComponents/Communication/Whatsapp';
import Email from './components/pages/settings/SettingsComponents/Communication/Email';
import TeamsForm from './components/createForm/TeamsForm/TeamsForm';
import SettingEntityForm from './components/pages/settings/SettingsComponents/Forms/Settingentityform';
import SettingBoardMeetingForm from './components/pages/settings/SettingsComponents/Forms/SettingBoardMeetingForm';
import SettingUserForm from './components/pages/settings/SettingsComponents/Forms/SettingUserForm';
import SettingTeamsForm from './components/pages/settings/SettingsComponents/Forms/SettingTeamsForm';
import AddRoles from './components/pages/settings/SettingsComponents/Roles/AddRoles';
import Integrations from './components/pages/settings/SettingsComponents/Integrations/Integrations';
import WhatsappIntegrations from './components/pages/settings/SettingsComponents/Integrations/WhatsappIntegrations';
import EmailIntegrations from './components/pages/settings/SettingsComponents/Integrations/EmailIntegrations';
import Api from './components/pages/settings/SettingsComponents/Integrations/Api';
import Webhook from './components/pages/settings/SettingsComponents/Integrations/Webhook';
import Sms from './components/pages/settings/SettingsComponents/Integrations/Sms';
import PaymentGateway from './components/pages/settings/SettingsComponents/Integrations/PaymentGateway';
import BoardMeetingLandingPage from './components/landingPages/boardMeeting/BoardMeetingLandingPage';
import TeamsLandingPage from './components/landingPages/teams/TeamsLandingPage';
import UserLandingPage from './components/landingPages/user/UserLandingPage';
import AddEmailTemplate from './components/pages/settings/SettingsComponents/Communication/AddEmailTemplate';
import AddWhatsappTemplate from './components/pages/settings/SettingsComponents/Communication/AddWhatsappTemplate';
import Dupaddrole from './components/pages/settings/SettingsComponents/Roles/Dupaddrole';
import EditWhatsappTemplate from './components/pages/settings/SettingsComponents/Communication/EditWhatsappTemplate';
import EditEmailTemplate from './components/pages/settings/SettingsComponents/Communication/EditEmailTemplate';
import ViewEmailTemplate from './components/pages/settings/SettingsComponents/Communication/ViewEmailTemplate';
import FieldsWhatsappTemplate from './components/pages/settings/SettingsComponents/Communication/FieldsWhatsappTemplate';
import useOnlineStatus from './hooks/isOnline/useOnlineStatus ';
import useServiceWorker from './useSw';
import { AuthContext } from './contexts/authContext/authContext';
import { useContext } from 'react';

function App() {
  const isOnline = useOnlineStatus();
  const { authState } = useContext(AuthContext);
  const isLoggedIn = authState?.token ? true : false ?? false;
  console.log(isOnline, isLoggedIn, "sw.js", Date.now())
  const { usingSW, swRegistration, svcworker, sendSWMessage, sendStatusUpdate } = useServiceWorker(isOnline, isLoggedIn);
  return (
    <>
      {isOnline ? null : (
        <span role="img" aria-label="Offline" style={{ position: 'fixed', bottom: 0, right: 0, padding: '15px', background: 'red', color: 'white', zIndex: 1000 }}>
          ⚠️ You are offline
        </span>
      )}

      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/organizationprofile' element={<OrganizationProfile />} />
          <Route path='/roles' element={<Roles />} />
          <Route path='/integrations' element={<Integrations />} />
          <Route path='/addroles' element={<AddRoles />} />
          <Route path='/dupaddroles' element={<Dupaddrole />} />
          <Route path='/communication' element={<Communication />} />
          <Route path='/whatsappintegration' element={<WhatsappIntegrations />} />
          <Route path='/emailintegration' element={<EmailIntegrations />} />
          <Route path='/addemailtemplate' element={<AddEmailTemplate />} />
          <Route path='/addwhatsapptemplate' element={<AddWhatsappTemplate />} />
          <Route path='/editemailtemplate' element={<EditEmailTemplate />} />
          <Route path='/editwhatsapptemplate' element={<EditWhatsappTemplate />} />
          <Route path='viewemailtemplate' element={<ViewEmailTemplate />} />
          <Route path='/fieldswhatsapptemplate' element={<FieldsWhatsappTemplate />} />
          <Route path="/api" element={<Api />} />
          <Route path='webhook' element={<Webhook />} />
          <Route path='sms' element={<Sms />} />
          <Route path='paymentgateway' element={<PaymentGateway />} />
          <Route path='/email' element={<Email />} />
          <Route path='/Whatsapp' element={<Whatsapp />} />
          <Route path='/forms' element={<Forms />} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/entities' element={<Entities />}>
            <Route path="otl" element={<EntityForm />} />
          </Route>
          <Route path="/entitylandingpage/:id" element={<EntityLandingPage />} />
          <Route path="/boardmeetinglandingpage" element={<BoardMeetingLandingPage />} />
          <Route path='/teamslandingpage' element={<TeamsLandingPage />} />
          <Route path='/userlandingpage/:id' element={<UserLandingPage />} />
          <Route path="/settingentityform" element={<SettingEntityForm />} />
          <Route path="/settingboardmeetingform" element={<SettingBoardMeetingForm />} />
          <Route path="/settingteamsform" element={<SettingTeamsForm />} />
          <Route path="/settinguserform" element={<SettingUserForm />} />
          <Route path="/entities/new" element={<EntityForm />} />
          <Route path='/boardmeetings' element={<BoardMeetings />} />
          <Route path="/boardmeetings/new" element={<BoardMeetingForm />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/users' element={<Users />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/userProfile/:id" element={<UserProfile />} >
            <Route path="tasks" element={<UserTasks />} />
            <Route path="teams" element={<UserTeams />} />
            <Route path="enteties" element={<UserEntities />} />
          </Route>
          <Route path='/mycalendar' element={<MyCalendar />} />
        </Route>
        {/* public routes only. Note: rendered without side and top bars */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/changepassword/:id' element={<ChangePassword />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}


export default App;

