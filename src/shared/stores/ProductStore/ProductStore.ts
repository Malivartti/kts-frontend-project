import { Meta } from '@entities/Meta';
import { normalizeProuct, ProductModel } from '@entities/Product';
import { endpoints } from '@shared/configs/api';
import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';


type PrivateField = '_data' | '_meta' | '_message';

class ProductStore {
  private _data: ProductModel | null = null;
  private _meta: Meta = Meta.initial;
  private _message: string = '';

  constructor() {
    makeObservable<ProductStore, PrivateField>(this, {
      _data: observable,
      _meta: observable,
      _message: observable,
      data: computed,
      message: computed,
      isError: computed,
      isSuccess: computed,
      isLoading: computed,
      getProduct: action,
    });
  }

  get data(): ProductModel {
    return this._data;
  }

  get message(): string {
    return this._message;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading || this._meta === Meta.initial;
  }

  get isError(): boolean {
    return this._meta === Meta.error;
  }

  get isSuccess(): boolean {
    return this._meta === Meta.success;
  }

  async getProduct(productId: string = ''): Promise<void> {
    this._meta = Meta.loading;
    this._data = null;

    const url = endpoints.product.getProduct(productId);
    try {
      const res: AxiosResponse = await axios({
        method: 'get',
        url,
      });
    
      runInAction(() => {
        this._meta = Meta.success;
        this._data = normalizeProuct(res.data);
      });
    } catch (e) {
      runInAction(() => {
        this._message = 'Не удалось получить информацию о продукте';
        this._meta = Meta.error;
      });
      console.log(e);
    }
  }
}

export default ProductStore;
