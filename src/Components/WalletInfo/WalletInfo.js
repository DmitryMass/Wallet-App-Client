import React, { useEffect } from 'react';
import MainBalance from './MainBalance';
import MyCards from './MyCards/MyCards';

import styles from './wallet-info.m.css';
import CardsMenu from '../CardsMenu/CardsMenu';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLogoutMutation } from '../../Store/Slice/Login-Register/login-register-slice';

const WalletInfo = ({ setUser, user }) => {
  const [logout] = useLogoutMutation();
  const { t } = useTranslation();
  useEffect(() => {
    setUser(true);
  }, []);

  const navigate = useNavigate();

  const logoutUser = async () => {
    if (user) {
      await logout();
      setUser((prev) => !prev);
      delete localStorage.user;
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <main className={styles.wallet__main}>
      <div className={`container ${styles.wallet__info}`}>
        <div>
          <MainBalance />
          <MyCards />
        </div>
        <CardsMenu />
      </div>
      <div className={styles.wallet__logout}>
        {user && (
          <Button modificator={'edit'} handleClick={logoutUser}>
            {t('logout')}
          </Button>
        )}
      </div>
    </main>
  );
};

export default WalletInfo;
