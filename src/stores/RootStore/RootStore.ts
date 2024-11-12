import { action, computed, makeObservable, observable } from 'mobx';

import QueryParamsStore from '../QueryParamsStore';

type PrivateFields = '_currentPage'

class RootStore {
  readonly query = new QueryParamsStore();
  
  private _currentPage = 1;
  constructor() {
    makeObservable<RootStore, PrivateFields>(this, {
      _currentPage: observable,
      currentPage: computed,
      setCurrentPage: action,
    });
  }

  get currentPage(): number {
    return this._currentPage;
  }
  setCurrentPage(page: number): void {
    this._currentPage = page;
  }
}

export default RootStore;
