import { onlyNumbers, validateEmailString, validatePhoneNumberString } from '@shared/lib/validate';
import { action, computed, makeObservable, observable } from 'mobx';

import OrderStore from '../../OrderStore';

type PrivateField = '_name' | '_nameError' | '_phone' | '_phoneError' | '_email' | '_emailError'
 | '_city' | '_cityError' | '_street' | '_streetError' | '_house' | '_houseError' | '_apartment' | '_apartmentError';

class DeliveryStepModel {
  private _orderStore: OrderStore;
  private _name: string = '';
  private _nameError: string = '';
  private _phone: string = '';
  private _phoneError: string = '';
  private _email: string = '';
  private _emailError: string = '';
  private _city: string = '';
  private _cityError: string = '';
  private _street: string = '';
  private _streetError: string = '';
  private _house: string = '';
  private _houseError: string = '';
  private _apartment: string = '';
  private _apartmentError: string = '';
  
  constructor(orderStore: OrderStore) {
    this._orderStore = orderStore;

    makeObservable<DeliveryStepModel, PrivateField>(this, {
      _name: observable,
      _nameError: observable,
      _phone: observable,
      _phoneError: observable,
      _email: observable,
      _emailError: observable,
      _city: observable,
      _cityError: observable,
      _street: observable,
      _streetError: observable,
      _house: observable,
      _houseError: observable,
      _apartment: observable,
      _apartmentError: observable,
      name: computed,
      nameError: computed,
      phone: computed,
      phoneError: computed,
      email: computed,
      emailError: computed,
      city: computed,
      cityError: computed,
      street: computed,
      streetError: computed,
      house: computed,
      houseError: computed,
      apartment: computed,
      fullAddress: computed,
      setName: action.bound,
      setPhone: action.bound,
      setEmail: action.bound,
      setCity: action.bound,
      setStreet: action.bound,
      setHouse: action.bound,
      setApartment: action.bound,
      validateName: action,
      validatePhone: action,
      validateEmail: action,
      validateCity: action,
      validateStreet: action,
      validateHouse: action,
      validateApartment: action,
      checkStep: action,
    });
  }

  get name(): string {
    return this._name;
  }

  get nameError(): string {
    return this._nameError;
  }

  get phone(): string {
    return this._phone;
  }

  get phoneError(): string {
    return this._phoneError;
  }

  get email(): string {
    return this._email;
  }

  get emailError(): string {
    return this._emailError;
  }

  get city(): string {
    return this._city;
  }

  get cityError(): string {
    return this._cityError;
  }

  get street(): string {
    return this._street;
  }

  get streetError(): string {
    return this._streetError;
  }

  get house(): string {
    return this._house;
  }

  get houseError(): string {
    return this._houseError;
  }

  get apartment(): string {
    return this._apartment;
  }

  get apartmentError(): string {
    return this._apartmentError;
  }

  get fullAddress(): string {
    return `${this._city}, ${this._street} ${this.house}, ${this._apartment}`;
  }

  setName(name: string): void {
    if (this._nameError) {
      this._nameError = '';
    }
    this._name = name;
  }

  setPhone(phone: string): void {
    if (this._phoneError) {
      this._phoneError = '';
    }
    this._phone = phone;
  }

  setEmail(email: string): void {
    if (this._emailError) {
      this._emailError = '';
    }
    this._email = email;
  }

  setCity(city: string): void {
    if (this._cityError) {
      this._cityError = '';
    }
    this._city = city;
  }

  setStreet(street: string): void {
    if (this._streetError) {
      this._streetError = '';
    }
    this._street = street;
  }

  setHouse(house: string): void {
    if (this._houseError) {
      this._houseError = '';
    }
    this._house = house;
  }

  validateName(): boolean {
    if (!this._name.trim()) {
      this._nameError = 'Введите имя';
      return;
    }
    return true;
  }

  validatePhone(): boolean {
    if (!this._phone.trim()) {
      this._phoneError = 'Введите номер телефон';
      return;
    }
    if (!validatePhoneNumberString(this._phone.trim())) {
      this._phoneError = 'Введите 11 цифр';
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

  setApartment(apartment: string): void {
    if (this._apartmentError) {
      this._apartmentError = '';
    }
    this._apartment = apartment;
  }

  validateCity(): boolean {
    if (!this._city.trim()) {
      this._cityError = 'Введите город';
      return;
    }
    return true;
  }

  validateStreet(): boolean {
    if (!this._street.trim()) {
      this._streetError = 'Введите улицу';
      return;
    }
    return true;
  }

  validateHouse(): boolean {
    if (!this._house.trim()) {
      this._houseError = 'Введите дом';
      return;
    }
    return true;
  }

  validateApartment(): boolean {
    if (!this._apartment.trim()) {
      this._apartmentError = 'Введите квартиру';
      return;
    }
    if (!onlyNumbers(this._apartment.trim())) {
      this._apartmentError = 'Используйте только цифры';
      return;
    }
    return true;
  }

  checkStep(): void {
    const isValidName = this.validateName();
    const isValidPhone = this.validatePhone();
    const isValidEmail = this.validateEmail();
    const isValidCity = this.validateCity();
    const isValidStreet = this.validateStreet();
    const isValidHouse = this.validateHouse();
    const isValideApartment = this.validateApartment();

    if (isValidName && isValidPhone && isValidEmail && isValidCity && isValidStreet && isValidHouse && isValideApartment) {
      this._orderStore.nextStep();
    }
  }
}

export default DeliveryStepModel;
