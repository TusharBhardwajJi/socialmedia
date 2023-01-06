import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { loadUser } from './actions/user';
// import Tempp from './components/Tempp';
import ChangePassword from './components/ChangePassword.jsx';
import ForgotPassword from './components/ForgotPassword';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import NewPost from './components/NewPost';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import Search from './components/Search';
import Account from './components/Account';
import UserInfo from './components/UserInfo';
import NotFound from './components/NotFound';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const {isAuthenticated} = useSelector((state) => state.user)   // redux ma jo api type dekh rhi h
  


  return (
    <Router>
      {
        isAuthenticated===true ? <Header/>  : <></>
      }
        
        <Routes>
          <Route path='/' element={ isAuthenticated ? <Home/> : <Login/>} />
          <Route path='/account' element={ isAuthenticated ? <Account/> : <Login/>} />
          {/* <Route path='/account' element={ isAuthenticated ? <Tempp/> : <Login/>} /> */}
          <Route path='/newpost' element={ isAuthenticated ? <NewPost/> : <Login/>} />
          <Route path='/register' element={ isAuthenticated ? <Account/> : <Register/>} />
          <Route path='/update/password' element={ isAuthenticated ? <ChangePassword/> : <Login/>} />
          <Route path='/forgot/password' element={ isAuthenticated ? <ChangePassword/> : <ForgotPassword/>} />
          <Route path='/password/reset/:token' element={ isAuthenticated ? <ChangePassword/> : <ResetPassword/>} />
          <Route path='/user/:id' element={ isAuthenticated ? <UserInfo/> : <Login/>} />
          <Route path='/search' element={ isAuthenticated ? <Search/> : <Login/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
        
    </Router>

  );
}

export default App;
