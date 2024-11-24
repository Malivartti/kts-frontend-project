import { Meta } from '@entities/Meta';
import { normalizeProuct, ProductModel } from '@entities/Product';
import { endpoints } from '@shared/configs/api';
import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';


type PrivateField = '_data' | '_meta'

class ProductStore {
  private _data: ProductModel | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateField>(this, {
      _data: observable,
      _meta: observable,
      data: computed,
      meta: computed,
      isLoading: computed,
      getProduct: action,
    });
  }

  get data(): ProductModel {
    return this._data;
  }

  get meta(): Meta {
    return this._meta;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading || this._meta === Meta.initial;
  }

  get isError(): boolean {
    return this._meta === Meta.error;
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
      this._meta = Meta.error;
      console.log(e);
    }
  }
}

export default ProductStore;
