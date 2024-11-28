import { onlyLatinLettersAndNumbers, validateEmailString, validateUrlString } from '@shared/lib/validate';
import { action, computed, makeObservable, observable } from 'mobx';

import rootStore from '../RootStore';

type PrivateField = '_avatar' | '_avatarError' | '_name' | '_nameError' | '_email' | '_emailError' | '_password' 
| '_passwordError' | '_passwordRepeat' | '_passwordRepeatError'

class RegisterStore {
  private _avatar: string = '';
  private _avatarError: string = '';
  private _name: string = '';
  private _nameError: string = '';
  private _email: string = '';
  private _emailError: string = '';
  private _password: string = '';
  private _passwordError: string = '';
  private _passwordRepeat: string = '';
  private _passwordRepeatError: string = '';

  constructor() {
    makeObservable<RegisterStore, PrivateField>(this, {
      _avatar: observable,
      _avatarError: observable,
      _name: observable,
      _nameError: observable,
      _email: observable,
      _emailError: observable,
      _password: observable,
      _passwordError: observable,
      _passwordRepeat: observable,
      _passwordRepeatError: observable,
      avatar: computed,
      avatarError: computed,
      name: computed,
      nameError: computed,
      email: computed,
      emailError: computed,
      password: computed,
      passwordError: computed,
      passwordRepeat: computed,
      passwordRepeatError: computed,
      setAvatar: action.bound,
      setName: action.bound,
      setEmail: action.bound,
      setPassword: action.bound,
      setPasswordRepeat: action.bound,
      validateAvatar: action,
      validateName: action,
      validateEmail: action,
      validatePassword: action,
      validatePasswordRepeat: action,
      isValid: action,
      register: action,
    });
  }

  get avatar(): string {
    return this._avatar;
  }

  get avatarError(): string {
    return this._avatarError;
  }

  get name(): string {
    return this._name;
  }

  get nameError(): string {
    return this._nameError;
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

  get passwordRepeat(): string {
    return this._passwordRepeat;
  }

  get passwordRepeatError(): string {
    return this._passwordRepeatError;
  }

  setAvatar(avatar: string): void {
    if (this._avatarError) {
      this._avatarError = '';
    }
    this._avatar = avatar;
  }

  setName(name: string): void {
    if (this._nameError) {
      this._nameError = '';
    }
    this._name = name;
  }

  setEmail(email: string): void {
    if (this._emailError) {
      this._emailError = '';
    }
    this._email = email;
  }

  setPassword(password: string): void {
    if (this._passwordError) {
      this._passwordError = '';
    }
    this._password = password;
  }

  setPasswordRepeat(passwordRepeat: string): void {
    if (this._passwordRepeatError) {
      this._passwordRepeatError = '';
    }
    this._passwordRepeat = passwordRepeat;
  }

  validateAvatar(): boolean {
    if (!this._avatar.trim()) {
      this._avatarError = 'Введите ссылку на изображение';
      return;
    }
    if (!validateUrlString(this._avatar)) {
      this._avatarError = 'Неверный формат';
      return;
    }
    return true;
  }

  validateName(): boolean {
    if (!this._name.trim()) {
      this._nameError = 'Введите имя';
      return;
    }
    return true;
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

  validatePasswordRepeat(): boolean {
    if (!this._passwordRepeat.trim()) {
      this._passwordRepeatError = 'Введите пароль повторно';
      return;
    }
    if (this._passwordRepeat !== this._password) {
      this._passwordRepeatError = 'Пароли не совпадают';
      return;
    }
    return true;
  }

  isValid(): boolean {
    const isAvatarValide = this.validateAvatar();
    const isNameValide = this.validateName();
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();
    const isPasswordRepeatValid = this.validatePasswordRepeat();

    return isAvatarValide && isNameValide && isEmailValid && isPasswordValid && isPasswordRepeatValid;
  }

  async register(): Promise<void> {
    if (!this.isValid()) return;

    await rootStore.user.registerUser(this._avatar, this._name, this._email, this._password);
  }
}

export default RegisterStore;
