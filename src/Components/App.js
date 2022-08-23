import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import WalletInfo from './WalletInfo/WalletInfo';
import Register from '../Pages/Register';
import Login from '../Pages/Login/login';

import '../Utils/i18n';
import Home from '../Pages/Home/Home';
import { useSelector } from 'react-redux';
import { APP_ROUTES } from './Constants/All-Routes';
import NotFound from '../Pages/NotFoundPage/NotFound';

const App = () => {
  const user = useSelector((state) => state.userToken.user);

  return (
    <Suspense fallback={'Loading...'}>
      <div className='app'>
        <div className='wrapper'>
          <Header user={user} />
          <Routes>
            <Route
              path={APP_ROUTES.HOME}
              element={user ? <Navigate to={APP_ROUTES.WALLET} /> : <Home />}
            />
            <Route
              path={APP_ROUTES.WALLET}
              element={
                user ? <WalletInfo /> : <Navigate to={APP_ROUTES.HOME} />
              }
            />
            <Route
              path={APP_ROUTES.REGISTRATION}
              element={
                user ? <Navigate to={APP_ROUTES.WALLET} /> : <Register />
              }
            />
            <Route
              path={APP_ROUTES.LOGIN}
              element={user ? <Navigate to={APP_ROUTES.WALLET} /> : <Login />}
            />
            <Route path={APP_ROUTES.NOTFOUND} element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
};

export default App;
