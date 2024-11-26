import { BugProductModel } from '@entities/BugProduct';
import { ProductModel } from '@entities/Product';
import { action, computed, makeObservable, observable } from 'mobx';

type PrivateField = '_bug';

class BugStore {
  private _bug: BugProductModel[] = [];
  private readonly _productCountLimit: number = 10;

  constructor() {
    makeObservable<BugStore, PrivateField>(this, {
      _bug: observable,
      bug: computed,
      bugCount: computed,
      totalSum: computed,
      setBug: action,
      addToBug: action.bound,
      removeFromBug: action.bound,
      increaseProductCount: action.bound,
      decreaseProductCount: action.bound,
    });
  }

  get bug(): BugProductModel[] {
    return this._bug;
  }

  get bugCount(): number {
    return this._bug.reduce((acc, curr) => acc + curr.count, 0);
  }

  get totalSum(): number {
    return this._bug.reduce((acc, cur) => acc + (cur.price * cur.count), 0);
  }

  setBug(bugProuducts: BugProductModel[]) {
    this._bug = bugProuducts;
  }

  addToBug(product: ProductModel): void {
    if (!this._bug.find(item => item.id === product.id)) {
      this._bug = [...this._bug, {
        ...product,
        count: 1,
      }];
    }
  }

  removeFromBug(product: ProductModel): void {
    this._bug = this.bug.filter(item => item.id !== product.id);
  }

  increaseProductCount(product: ProductModel) {
    this._bug = this._bug.map(item => {
      if (item.id === product.id && item.count < this._productCountLimit) {
        item.count++;
      }
      return item;
    });
  }

  decreaseProductCount(product: ProductModel): void {
    this._bug = this._bug.map(item => {
      if (item.id == product.id && item.count > 1) {
        item.count--;
      }
      return item;
    });
  }
}

export default BugStore;
