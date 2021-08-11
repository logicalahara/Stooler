import React, { useState, useCallback, useEffect} from 'react';
import ReactSession from './Reactsession';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useParams
} from 'react-router-dom';
import Main from './groups/pages/main';
import Image from './groups/pages/image';
import MyGroup from './groups/pages/mygroup';
import GroupAuth from './groups/pages/creategroup';
import Auth from './user/pages/Auth';
import Profile from './user/pages/Profile';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Pillars from './shared/components/Footer/pillars';
import Footer from './shared/components/Footer/footer';
import { AuthContext } from './shared/context/auth-context';
import JoinGroup from './groups/pages/getjoinGroups';
import JoinGroupAuth from './groups/pages/joingroups';
import YourGroup from './groups/pages/groupSource';
import SourceDetails from './groups/pages/sourceDetails';
import GetGroupSource from './groups/pages/getgroupsource';
import Process from './groups/pages/process';
import OwnedGroups from './groups/pages/ownedGroups';
import GroupMembers from './groups/pages/groupMembers';
import EditSource from '../src/groups/pages/editsource';
import RequestSource from '../src/groups/pages/requestsource';
import DeleteSource from '../src/groups/pages/deletesource';
import Chatbot from '../src/chatbot/chatbot';
import Crypto from './crypto/crypto';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  // ReactSession.setStoreType("localStorage");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [token, setToken] = useState(false);
  // const [userId, setuserId] = useState(false);
  // const [tokenExpirationDate, setTokenExpirationDate] = useState();
  // let logoutTimer;

  // const login = useCallback((uid, token, expirationDate) => {
  //   setToken(token);
  //   setuserId(uid);
  //   const tokenExpirationDate =
  //     expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
  //   setTokenExpirationDate(tokenExpirationDate);
  //   localStorage.setItem(
  //     'userData',
  //     JSON.stringify({
  //       userId: uid,
  //       token: token,
  //       expiration: tokenExpirationDate.toISOString()
  //     })
  //   );
  // }, []);
  // const logout = useCallback(() => {
  //   setToken(null);
  //   setTokenExpirationDate(null);
  //   setuserId(null);
  //   localStorage.removeItem('userData');
  // }, []);
  // useEffect(() => {
  //   if (token && tokenExpirationDate) {
  //     const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
  //     logoutTimer = setTimeout(logout, remainingTime);
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [token, logout, tokenExpirationDate]);
  // // const login = useCallback(() => {
  // //   setIsLoggedIn(true);
  // // }, []);

  // const logout = useCallback(() => {
  //   setIsLoggedIn(false);
  //   ReactSession.remove('username');
  //   ReactSession.remove('userId');
  //   ReactSession.remove('token');
  // }, []);
  
  // useEffect(() => {
  //   if (ReactSession.get("username")) {
  //     login();
  //   }
  // }, [login]);
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Image/>
          <Main />
          <Pillars/>
        </Route>
        <Route path="/group_auth" exact>
          <GroupAuth />
        </Route>
        <Route path="/view_group" exact>
          <JoinGroup />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/group/:gid" exact>
          <JoinGroupAuth/>
        </Route>
        <Route path="/portfolio" exact>
          <MyGroup />
        </Route>
        <Route path="/yourgroup/:gid" exact>
          <YourGroup/>
        </Route>
        <Route path="/source/:sid" exact>
          <SourceDetails/>
        </Route>
        <Route path="/getgroupsource/:uid" exact>
          <GetGroupSource/>
        </Route>
        <Route path="/request/:sid/:status" exact>
          <Process/>
        </Route>
        <Route path="/editsource/:sid" exact>
          <EditSource/>
        </Route>
        <Route path="/deletesource/:sid" exact>
          <DeleteSource/>
        </Route>
        <Route path="/requestsource/:gid" exact>
          <RequestSource/>
        </Route>
        <Route path="/groupdetails/:gid" exact>
          <GroupMembers/>
        </Route>
        <Route path="/ownedgroups/getgroups/:gid" exact>
          <OwnedGroups/>
        </Route>
        {/* <Route path="/transfergroupownership/getgroups/:gid" exact>
          <OwnedGroups/>
        </Route> */}
        <Route path="/crypto" exact>
          <Crypto/>
        </Route>
        <Redirect to="/" />       
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
        
        <Image />
        <Pillars/>
        </Route>
        
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ 
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout 
      }}
    >
      <Router>
      <MainNavigation />
        <main>{routes}</main>
        <div className="bot">
            <Route path="/" component={Chatbot} exact />
            
            <Footer/>
       </div>
      </Router>  
    </AuthContext.Provider>
  );
};

export default App;