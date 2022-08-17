import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import WalletInfo from './WalletInfo/WalletInfo';
import Register from '../Pages/Register';
import Login from '../Pages/Login/login';

import '../Utils/i18n';
import Home from '../Pages/Home/Home';

const App = () => {
  const [user, setUser] = useState(false);
  const userInfo = localStorage.user && JSON.parse(localStorage.user);

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [user, localStorage, setUser]);

  return (
    <Suspense fallback={'Loading...'}>
      <div className='app'>
        <div className='wrapper'>
          <Header user={user} />
          <Routes>
            <Route
              path='/'
              element={user ? <Navigate to='/wallet' /> : <Home />}
            />
            <Route
              path='/wallet'
              element={
                user ? (
                  <WalletInfo setUser={setUser} user={user} />
                ) : (
                  <Navigate to='/' />
                )
              }
            />
            <Route
              path='/registration'
              element={user ? <Navigate to='/wallet' /> : <Register />}
            />
            <Route
              path='/login'
              element={user ? <Navigate to='/wallet' /> : <Login />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
};

export default App;
