import { action, computed, makeObservable, observable } from 'mobx';

import rootStore from '../RootStore';

type PrivateField = '_name' | '_nameError'

class ProfileStore {
  private _name: string = '';
  private _nameError: string = '';

  constructor() {
    makeObservable<ProfileStore, PrivateField>(this, {
      _name: observable,
      _nameError: observable,
      name: computed,
      nameError: computed,
      setName: action.bound,
      validateName: action,
      updateUser: action,
    });
  }

  get name(): string {
    return this._name;
  }

  get nameError(): string {
    return this._nameError;
  }

  setName(name: string): void {
    this._name = name;
  }

  validateName(): boolean {
    if (!this._name.trim()) {
      this._nameError = 'Введите новое имя';
      return;
    }
    return true;
  }

  async updateUser(): Promise<void> {
    const isValidName = this.validateName();
    if (!isValidName) return;
    
    await rootStore.user.updateUser(this._name);
  }
}

export default ProfileStore;
