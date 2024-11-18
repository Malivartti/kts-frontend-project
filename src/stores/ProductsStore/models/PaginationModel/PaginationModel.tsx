import { action, computed, makeObservable, observable } from 'mobx';

type PrivateField = '_totalPages' | '_currentPage' | '_isLoading';

class PaginationModel {
  private _totalPages: number = 0;
  private _currentPage: number = 1;
  private _isLoading: boolean = false;

  constructor() {
    makeObservable<PaginationModel, PrivateField>(this, {
      _currentPage: observable,
      _totalPages: observable,
      _isLoading: observable,
      currentPage: computed,
      totalPages: computed,
      isFirstPage: computed,
      isLastPage: computed,
      isLoading: computed,
      setIsLoading: action,
      setCurrentPage: action.bound,
      setTotalPages: action,
      incrementPage: action.bound,
      decrementPage: action.bound,
    });
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  get isFirstPage(): boolean {
    return this._currentPage === 1;
  }

  get isLastPage(): boolean {
    return this._currentPage === this._totalPages;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  setIsLoading(isLoading: boolean): void {
    this._isLoading = isLoading;
  }

  setCurrentPage(page: number): void {
    this._currentPage = page;
  }

  setTotalPages(totalPages: number): void {
    this._totalPages = totalPages;
  }

  incrementPage(): void {
    if (this._currentPage < this._totalPages) {
      this._currentPage += 1;
    }
  }

  decrementPage(): void {
    if (this._currentPage > 1) {
      this._currentPage -= 1;
    }
  }
}

export default PaginationModel;
