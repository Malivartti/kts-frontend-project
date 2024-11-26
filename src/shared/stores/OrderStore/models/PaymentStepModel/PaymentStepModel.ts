import { validateCardExpiryString, validateCardNumberString } from '@shared/lib/validate';
import { action, computed, makeObservable, observable } from 'mobx';

import OrderStore from '../../OrderStore';

type PrivateField = '_number' | '_numberError' | '_expiry' | '_expiryError' | '_cvc' | '_cvcError';

class PaymentStepModel {
  private _orderStore: OrderStore;
  private _number: string = '';
  private _numberError: string = '';
  private _expiry: string = '';
  private _expiryError: string = '';
  private _cvc: string = '';
  private _cvcError: string = '';


  constructor(orderStore: OrderStore) {
    this._orderStore = orderStore;
    makeObservable<PaymentStepModel, PrivateField>(this, {
      _number: observable,
      _numberError: observable,
      _expiry: observable,
      _expiryError: observable,
      _cvc: observable,
      _cvcError: observable,
      number: computed,
      numberError: computed,
      expiry: computed,
      expiryError: computed,
      cvc: computed,
      cvcError: computed,
      setNumber: action.bound,
      setExpiry: action.bound,
      setCvc: action.bound,
      validateNumber: action,
      validateExpiry: action,
      validateCvc: action,
      checkStep: action,
    });
  }

  get number(): string {
    return this._number;
  }

  get numberError(): string {
    return this._numberError;
  }

  get expiry(): string {
    return this._expiry;
  }

  get expiryError(): string {
    return this._expiryError;
  }

  get cvc(): string {
    return this._cvc;
  }

  get cvcError(): string {
    return this._cvcError;
  }

  setNumber(number: string): void {
    if (this._numberError) {
      this._numberError = '';
    }
    this._number = number;
  }

  setExpiry(expiry: string): void {
    if (this._expiryError) {
      this._expiryError = '';
    }
    this._expiry = expiry;
  }

  setCvc(cvc: string): void {
    if (this._cvcError) {
      this._cvcError = '';
    }
    this._cvc = cvc;
  }

  validateNumber(): boolean {
    if (!this._number.trim()) {
      this._numberError = 'Введите номер карты';
      return;
    }
    if (!validateCardNumberString(this._number.trim())) {
      this._numberError = 'Введите 16 цифр';
      return;
    }
    return true;
  }

  validateExpiry(): boolean {
    if (!this._expiry.trim()) {
      this._expiryError = 'Введите срок действия карты';
      return;
    }
    if (!validateCardExpiryString(this._expiry.trim())) {
      this._expiryError = 'Формат ММ/ГГ';
      return;
    }
    return true;
  }

  validateCvc(): boolean {
    if (!this._cvc.trim()) {
      this._cvcError = 'Введите CVC';
      return;
    }
    if (this._cvc.trim().length !== 3) {
      this._cvcError = 'Введите 3 цифры';
      return;
    }
    return true;
  }

  checkStep(): void {
    const isValidNumber = this.validateNumber();
    const isValidExpiry = this.validateExpiry();
    const isValidCvc = this.validateCvc();

    if (isValidNumber && isValidExpiry && isValidCvc) {
      this._orderStore.nextStep();
    }
  }
}

export default PaymentStepModel;
