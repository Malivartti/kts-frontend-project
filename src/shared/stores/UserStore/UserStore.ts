import { Meta } from '@entities/Meta';
import { normalizationUser, UserApi, UserCheckEmailReqApi, UserCheckEmailResApi, UserCreateReqApi, UserLoginReqApi, UserLoginResApi, UserModel, UserUpdateReqApi } from '@entities/User';
import { endpoints } from '@shared/configs/api';
import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

type PrivateField = '_user' | '_meta' | '_error' | '_accessToken' | '_refreshToken' | '_isLogin';

class UserStore {
  private _user: UserModel | null = null;
  private _meta: Meta = Meta.initial;
  private _error: string = '';
  private _accessToken: string = '';
  private _refreshToken: string = '';
  private _isLogin: boolean | null = null;

  constructor() {
    makeObservable<UserStore, PrivateField>(this, {
      _user: observable,
      _meta: observable,
      _error: observable,
      _accessToken: observable,
      _refreshToken: observable,
      _isLogin: observable,
      user: computed,
      isSuccess: computed,
      isLoading: computed,
      isError: computed,
      error: computed,
      accessToken: computed,
      refreshToken: computed,
      isLogin: computed,
      setAccessToken: action,
      setRefreshToken: action,
      getAccessToken: action,
      refreshTokens: action,
      getUser: action,
      loginUser: action,
      logoutUser: action,
      setIsLogin: action,
      setUser: action,
      resetError: action,
      updateUser: action,
    });
  }

  get user(): UserModel {
    return this._user;
  }

  get isSuccess(): boolean {
    return this._meta === Meta.success;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  get isError(): boolean {
    return this._meta === Meta.error;
  }

  get error(): string {
    return this._error;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  get isLogin(): boolean {
    return this._isLogin;
  }

  resetError(): void {
    this._error = '';
    this._meta = Meta.initial;
  }

  setAccessToken(token: string) {
    this._accessToken = token;
  }

  setRefreshToken(token: string) {
    this._refreshToken = token;
  }

  setIsLogin(isLogin: boolean) {
    this._isLogin = isLogin;
  }

  setUser(user: UserModel) {
    this._user = user;
  }

  async getAccessToken(email: string, password: string): Promise<void> {
    const url = endpoints.user.getAccessToken();
    const data: UserLoginReqApi = {
      email,
      password,
    };

    try {
      const res: AxiosResponse<UserLoginResApi> = await axios({
        method: 'post',
        url,
        data,
      });

      runInAction(() => {
        this._accessToken = res.data.access_token;
        this._refreshToken = res.data.refresh_token;
      });
    } catch (e) {
      runInAction(() => {
        this._error = 'Не удалось войти';
        this._meta = Meta.error;
      });
      console.log(e);
    }
  }

  async refreshTokens(): Promise<void> {
    const url = endpoints.user.refreshToken();
    const data = {
      refreshToken: this._refreshToken,
    };

    try {
      const res: AxiosResponse<UserLoginResApi> = await axios({
        method: 'post',
        url,
        data,
      });

      runInAction(() => {
        this._accessToken = res.data.access_token;
        this._refreshToken = res.data.refresh_token;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getUser(): Promise<void> {
    const url = endpoints.user.get();
    const headers = {
      'Authorization': `Bearer ${this._accessToken}`,
    };

    try {
      const res: AxiosResponse<UserApi> = await axios({
        method: 'get',
        url,
        headers,
      });
      runInAction(() => {
        this._user = normalizationUser(res.data);
        this._meta = Meta.success;
        this._isLogin = true;
      });

    } catch(e) {
      runInAction(() => {
        this._error = 'Не удалось получить данные пользователя';
        this._meta = Meta.error;
      });
      console.log(e);
    }
  }

  async loginUser(email: string, password: string) {
    this._meta = Meta.loading;
    await this.getAccessToken(email, password);
    if (!this.isError) {
      await this.getUser();
    }
  }

  async checkEmail(email: string): Promise<boolean> {
    const url = endpoints.user.checkEmail();
    const data: UserCheckEmailReqApi = {
      email,
    };

    try {
      const res: AxiosResponse<UserCheckEmailResApi> = await axios({
        method: 'post',
        url,
        data,
      });

      return res.data.isAvailable;
    } catch (e) {
      runInAction(() => {
        this._error = 'Не удалось проверить почту';
        this._meta = Meta.error;
      });
      console.log(e);
    }
  }

  async createUser(avatar: string, name: string, email: string, password: string): Promise<void> {
    const url = endpoints.user.create();
    const data: UserCreateReqApi = {
      avatar,
      name,
      email,
      password,
    };

    try {
      const res: AxiosResponse<UserApi> = await axios({
        method: 'post',
        url,
        data,
      });

      runInAction(() => {
        this._user = normalizationUser(res.data);
        this._meta = Meta.success;
      });
    } catch (e) {
      runInAction(() => {
        this._error = 'Не удалось зарегистрироваться';
        this._meta = Meta.error;
      });
      console.log(e);
    }
  }

  logoutUser(): void {
    this._user = null;
    this._meta = Meta.initial;
    this._error = '';
    this._accessToken = '';
    this._refreshToken = '';
    this._isLogin = false;
  }

  async registerUser(avatar: string, name: string, email: string, password: string): Promise<void> {
    // const emailIsAvailable = await this.checkEmail(email);
    await this.createUser(avatar, name, email, password);
    if (!this.isError) {
      await this.loginUser(email, password);
    }
  }

  async updateUser(newName: string): Promise<void> {
    const url = endpoints.user.update(String(this._user.id));
    const data: UserUpdateReqApi = {
      email: this._user.email,
      name: newName,
    };

    try {
      const res: AxiosResponse<UserApi> = await axios({
        method: 'post',
        url,
        data,
      });
      runInAction(() => {
        this._user = normalizationUser(res.data);
        this._meta = Meta.success;
      });
    } catch(e) {
      runInAction(() => {
        this._error = 'Не удалось изменить данные пользователя';
        this._meta = Meta.error;
      });
      console.log(e);
    }
  }
}

export default UserStore;
