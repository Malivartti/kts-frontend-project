import { onlyLatinLettersAndNumbers, validateEmailString } from '@shared/lib/validate';
import { action, computed, makeObservable, observable } from 'mobx';

import rootStore from '../RootStore';

type PrivateField ='_email' | '_emailError' | '_password' | '_passwordError'

class LoginStore {
  private _email: string = '';
  private _emailError: string = '';
  private _password: string = '';
  private _passwordError: string = '';

  constructor() {
    makeObservable<LoginStore, PrivateField>(this, {
      _email: observable,
      _emailError: observable,
      _password: observable,
      _passwordError: observable,
      email: computed,
      emailError: computed,
      password: computed,
      passwordError: computed,
      setEmail: action.bound,
      setPassword: action.bound,
      validateEmail: action,
      validatePassword: action,
      login: action,
    });
  }

  get email(): string {
    return this._email;
  }

  get emailError(): string {
    return this._emailError;
  }

  get password(): string {
    return this._password;
  }

  get passwordError(): string {
    return this._passwordError;
  }

  setEmail(email: string): void {
    if (rootStore.user.isError) {
      rootStore.user.resetError();
    }
    if (this._emailError) {
      this._emailError = '';
    }
    this._email = email;
  }

  setPassword(password: string): void {
    if (rootStore.user.isError) {
      rootStore.user.resetError();
    }
    if (this._passwordError) {
      this._passwordError = '';
    }
    this._password = password;
  }

  validateEmail(): boolean {
    if (!this._email.trim()) {
      this._emailError = 'Введите почту';
      return;
    }
    if (!validateEmailString(this._email)) {
      this._emailError = 'Неверный формат';
      return;
    }
    return true;
  }

  validatePassword(): boolean {
    if (!this._password.trim()) {
      this._passwordError = 'Введите пароль';
      return;
    }
    if (!onlyLatinLettersAndNumbers(this._password.trim())) {
      this._passwordError = 'Пароль должен состоять только из латинских букв и цифр';
      return;
    }
    if (this._password.trim().length < 4) {
      this._passwordError = 'Пароль должен иметь минимум 4 символа';
      return;
    }
    return true;
  }

  async login(): Promise<void> {
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();
    if (isEmailValid && isPasswordValid) {
      await rootStore.user.loginUser(this._email, this._password);
    }
  }
}

export default LoginStore;
