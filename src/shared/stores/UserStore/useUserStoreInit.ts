import { reaction, toJS, when } from 'mobx';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import rootStore from '../RootStore';

const COOKIE_KEY_ACCESS_TOKEN = 'access-token';
const COOKIE_KEY_REFRESH_TOKEN = 'refresh-token';
const COOKIE_KEY_IS_LOGIN = 'is-login';
const COOKIE_KEY_USER_DATA = 'user-data';

export const useUserStoreInit = () => {
  const [cookies, setCookies] = useCookies();

  const accessToken = cookies[COOKIE_KEY_ACCESS_TOKEN];
  const refreshToken = cookies[COOKIE_KEY_REFRESH_TOKEN];
  const isLogin = cookies[COOKIE_KEY_IS_LOGIN];
  const userData = cookies[COOKIE_KEY_USER_DATA];
    
  if (isLogin === undefined) {
    setCookies(COOKIE_KEY_IS_LOGIN, 'false');
    rootStore.user.setIsLogin(false);
  } else {
    rootStore.user.setIsLogin(isLogin);
  }

  if (accessToken && refreshToken) {
    rootStore.user.setAccessToken(accessToken);
    rootStore.user.setRefreshToken(refreshToken);
  }

  useEffect(() => {
    const accessTokenReactionDisposer = reaction(
      () => rootStore.user.accessToken,
      accessToken => {
        setCookies(COOKIE_KEY_ACCESS_TOKEN, accessToken);
      }
    );
  
    const refreshTokenReactionDisposer = reaction(
      () => rootStore.user.refreshToken,
      refreshToken => {
        setCookies(COOKIE_KEY_REFRESH_TOKEN, refreshToken);
      }
    );
  
    const isLoginReactionDisposer = reaction(
      () => rootStore.user.isLogin,
      isLogin => {
        if (isLogin !== null) {
          setCookies(COOKIE_KEY_IS_LOGIN, isLogin);
          setCookies(COOKIE_KEY_USER_DATA, JSON.stringify(toJS(rootStore.user.user)));
        }
      }
    );

    const userWhenDisposer = when(
      () => rootStore.user.user === null && rootStore.user.isLogin,
      () => {
        rootStore.user.setUser(userData);
      }
    );

    return () => {
      accessTokenReactionDisposer();
      refreshTokenReactionDisposer();
      isLoginReactionDisposer();
      userWhenDisposer();
    };
  });
};
