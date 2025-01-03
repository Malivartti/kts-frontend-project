
import { BagProductModel } from '@entities/BagProduct';
import { ProductModel } from '@entities/Product';
import { action, computed, makeObservable, observable } from 'mobx';

type PrivateField = '_bag' | '_isShowSidebar'; 

class BagStore {
  private _bag: BagProductModel[] = [];
  private _isShowSidebar: boolean = false;
  private readonly _productCountLimit: number = 10;

  constructor() {
    makeObservable<BagStore, PrivateField>(this, {
      _bag: observable,
      _isShowSidebar: observable,
      bag: computed,
      bagCount: computed,
      totalSum: computed,
      isShowSidebar: computed,
      setBag: action,
      addToBag: action.bound,
      removeFromBag: action.bound,
      increaseProductCount: action.bound,
      decreaseProductCount: action.bound,
      setIsShowSidebar: action,
    });
  }

  get bag(): BagProductModel[] {
    return this._bag;
  }

  get bagCount(): number {
    return this._bag.reduce((acc, curr) => acc + curr.count, 0);
  }

  get totalSum(): number {
    return this._bag.reduce((acc, cur) => acc + (cur.price * cur.count), 0);
  }

  get isShowSidebar(): boolean {
    return this._isShowSidebar;
  }

  setBag(bagProuducts: BagProductModel[]): void {
    this._bag = bagProuducts;
  }

  setIsShowSidebar(isShow: boolean): void {
    this._isShowSidebar = isShow;
  }

  addToBag(product: ProductModel): void {
    if (!this._bag.find(item => item.id === product.id)) {
      this._bag = [...this._bag, {
        ...product,
        count: 1,
      }];
    }
  }

  removeFromBag(product: ProductModel): void {
    this._bag = this._bag.filter(item => item.id !== product.id);
  }

  increaseProductCount(product: ProductModel): void {
    this._bag = this._bag.map(item => {
      if (item.id === product.id && item.count < this._productCountLimit) {
        item.count++;
      }
      return item;
    });
  }

  decreaseProductCount(product: ProductModel): void {
    this._bag = this._bag.map(item => {
      if (item.id == product.id && item.count > 1) {
        item.count--;
      }
      return item;
    });
  }
}

export default BagStore;