import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { endpoints } from '@/configs/api';
import { Meta } from '@/entities/Meta';
import { IOption } from '@/entities/MultiDropdown';
import { ICategory, IProduct } from '@/entities/Product';

import rootStore from '../RootStore';

type PrivateField = '_products' | '_categories' | '_meta' | '_filter' | '_totalPages' | '_totalProducts' 

class ProductsStore {
  private _products: IProduct[] = [];
  private _categories: ICategory[] = [];
  private _meta: Meta = Meta.initial;
  private _filter: IOption[] = [];
  private _limit: number = 9;
  private _totalProducts: number = 0;
  private _totalPages: number = 0;
  

  constructor() {
    makeObservable<ProductsStore, PrivateField>(this, {
      _products: observable.ref,
      _categories: observable.ref,
      _meta: observable,
      _filter: observable.ref,
      _totalProducts: observable,
      _totalPages: observable,
      products: computed,
      categories: computed,
      meta: computed,
      filter: computed,
      totalProducts: computed,
      totalPages: computed,
      setFilter: action,
      getPageProducts: action.bound,
      getNextPageProducts: action.bound,
      getPrevPageProducts: action.bound,
      getCategoryes: action.bound,
      getFilter: action,
    });
  }

  get products(): IProduct[] {
    return this._products;
  }
  
  get categories(): ICategory[] {
    return this._categories;
  }

  get meta(): Meta {
    return this._meta;
  }

  get filter(): IOption[] {
    return this._filter;
  }

  get totalProducts(): number {
    return this._totalProducts;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  setFilter(values: IOption[]) {
    this._filter = values;
  }

  async getPageProducts(page?: number): Promise<void> {
    if (!page) {
      page = rootStore.currentPage;
    }
    const search = String(rootStore.query.getParam('search') || '');
    const filter = String(rootStore.query.getParam('filter')|| '');
    const query = new URLSearchParams();
    if (search) {
      query.set('title', search);
    }
    if (filter) {
      query.set('categoryId', filter);
    }
    const urlCount = endpoints.products.getCountProducts(query.toString());
    const urlData = endpoints.products.getPageProducts(page, this._limit, query.toString());
    this._meta = Meta.loading;
    this._products = [];
    rootStore.setCurrentPage(page);

    try {
      if (this._totalPages === 0) {
        const resCount: AxiosResponse = await axios({
          method: 'get',
          url: urlCount,
        });
        runInAction(() => {
          this._totalProducts = resCount.data.length;
          this._totalPages = Math.ceil(resCount.data.length / this._limit);
        });
      }
      
      const resData: AxiosResponse = await axios({
        method: 'get',
        url: urlData,
      });

      runInAction(() => {
        this._products = resData.data;
        this._meta = Meta.success;
      });
    } catch(e) {
      this._meta = Meta.error;
      alert(e);
    } 
  }


  async getNextPageProducts(): Promise<void> {
    await this.getPageProducts(rootStore.currentPage + 1);
  }

  async getPrevPageProducts(): Promise<void> {
    await this.getPageProducts(rootStore.currentPage - 1);
  }

  async getCategoryes(): Promise<void> {
    const url = endpoints.categoryes.getCategoryes();
    this._categories = [];

    try {
      const res: AxiosResponse = await axios({
        method: 'get',
        url,
      });

      this._categories = res.data;
    } catch(e) {
      alert(e);
    } 
  }

  getFilter() {
    const categoryIds = String(rootStore.query.getParam('filter'))?.split(',');
    if (this._categories.length) {
      this._filter = categoryIds.map(id => {
        const category = this._categories.find(category => category.id === Number(id));
        if (!category) {
          return;
        }
        return {
          key: id,
          value: category.name,
        };
      }).filter(item => !!item);
    }
  }
}

export default ProductsStore;
