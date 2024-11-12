import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { endpoints } from '@/configs/api';
import { Meta } from '@/entities/Meta';
import { IProduct } from '@/entities/Product';

type PrivateField = '_data' | '_meta'

class ProductStore {
  private _data: IProduct = {} as IProduct;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateField>(this, {
      _data: observable,
      _meta: observable,
      data: computed,
      meta: computed,
      getProduct: action,
    });
  }

  get data(): IProduct {
    return this._data;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProduct(productId: string = ''): Promise<void> {
    const url = endpoints.product.getProduct(productId);
  
    try {
      const res: AxiosResponse = await axios({
        method: 'get',
        url,
      });
    
      runInAction(() => {
        this._meta = Meta.success;
        this._data = res.data;
      });
    } catch (e) {
      this._meta = Meta.error;
      alert(e);
    }
  }
}

export default ProductStore;