import axios, { AxiosResponse } from 'axios';
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';

import { endpoints } from '@/configs/api';
import { ProductsSearchParams } from '@/configs/queryParams';
import { Meta } from '@/entities/Meta';
import { IOption } from '@/entities/MultiDropdown';
import { ICategory, IProduct } from '@/entities/Product';

import rootStore from '../RootStore';
import { normalizeProducts } from '../shared/normalize';
import PaginationModel from './models/PaginationModel';

type PrivateField = '_products' | '_categories' | '_meta' | '_search' | '_filter' | '_totalProducts' 

class ProductsStore {
  readonly paginationModel = new PaginationModel();
  private _products: IProduct[] = [];
  private _categories: ICategory[] = [];
  private _meta: Meta = Meta.initial;
  private _search: string = '';
  private _filter: IOption[] = [];
  private _limit: number = 9;
  private _totalProducts: number = 0;

  constructor() {
    makeObservable<ProductsStore, PrivateField>(this, {
      _products: observable.ref,
      _categories: observable.ref,
      _meta: observable,
      _search: observable,
      _filter: observable.ref,
      _totalProducts: observable,
      products: computed,
      categories: computed,
      meta: computed,
      isNoProducts: computed,
      search: computed,
      filter: computed,
      totalProducts: computed,
      isLoading: computed,
      getGeneralUrlParams: computed,
      setSearch: action.bound,
      setFilter: action.bound,
      getTotalProducts: action,
      getPageProducts: action,
      getProducts: action.bound,
      getProductsByFirst: action.bound,
      getCategoryes: action.bound,
      getDataOfQueryParams: action,
    });

  
    reaction(
      () => this._search,
      search => {
        rootStore.query.setParam(ProductsSearchParams.search, search);
      }
    );
  
    reaction(
      () => this._filter,
      filter => {
        const selectedCategories = filter.map(option => option.key).join(',');
        rootStore.query.setParam(ProductsSearchParams.filter, selectedCategories);
      }
    );
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

  get isNoProducts(): boolean {
    return !this._products.length && this._meta === Meta.success;
  }

  get search(): string {
    return this._search;
  }

  get filter(): IOption[] {
    return this._filter;
  }

  get totalProducts(): number {
    return this._totalProducts;
  }

  get isLoading(): boolean {
    return this._meta === Meta.initial || this._meta === Meta.loading;
  }

  setSearch(value: string): void {
    this._search = value;
  }

  setFilter(values: IOption[]): void {
    this._filter = values;
  }

  get getGeneralUrlParams(): URLSearchParams {
    const search = String(rootStore.query.getParam(ProductsSearchParams.search) || '');
    const filter = String(rootStore.query.getParam(ProductsSearchParams.filter) || '');
    const params = new URLSearchParams();
    if (search) {
      params.set('title', search);
    }
    if (filter) {
      params.set('categoryId', filter);
    }
    return params;
  }

  async getTotalProducts(): Promise<void> {
    const url = endpoints.products.getProducts();
    const params = this.getGeneralUrlParams;
    const resCount: AxiosResponse = await axios({
      method: 'get',
      url,
      params,
    });

    runInAction(() => {
      this._totalProducts = resCount.data.length;
      this.paginationModel.setTotalPages(Math.ceil(resCount.data.length / this._limit));
    });
  }


  async getPageProducts(): Promise<void> {
    const url = endpoints.products.getProducts();
    const params = this.getGeneralUrlParams;
    params.set('offset', String((this.paginationModel.currentPage - 1) * this._limit));
    params.set('limit', String(this._limit));

    const resData: AxiosResponse = await axios({
      method: 'get',
      url,
      params,
    });

    runInAction(() => {
      this._products = normalizeProducts(resData.data);
    });
  }

  async getProducts(): Promise<void> {
    this._meta = Meta.loading;
    this.paginationModel.setIsLoading(true);
    this._products = [];

    try {
      if (this.paginationModel.totalPages === 0 || this.paginationModel.currentPage === 1) {
        await this.getTotalProducts();
      }
      await this.getPageProducts();
      runInAction(() => {
        this._meta = Meta.success;
        this.paginationModel.setIsLoading(false);
      });
    } catch(e) {
      this._meta = Meta.error;
      this.paginationModel.setIsLoading(false);
      console.log(e);
    }
  }

  async getProductsByFirst(): Promise<void> {
    this.paginationModel.setCurrentPage(1);
    await this.getProducts();
  }

  async getCategoryes(): Promise<void> {
    const url = endpoints.categoryes.getCategoryes();
    this._categories = [];

    try {
      const res: AxiosResponse = await axios({
        method: 'get',
        url,
      });
      runInAction(() => {
        this._categories = res.data;
      });
    } catch(e) {
      alert(e);
    } 
  }

  getDataOfQueryParams() {
    const search = String(rootStore.query.getParam(ProductsSearchParams.search) || '');
    this._search = search;

    const categoryIds = String(rootStore.query.getParam(ProductsSearchParams.filter))?.split(',');
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

    const page = Number(rootStore.query.getParam(ProductsSearchParams.page) || 1);
    this.paginationModel.setCurrentPage(page);
  }

  private readonly _setCurrentPageReaaction: IReactionDisposer = reaction(
    () => this.paginationModel.currentPage,
    () => {
      this.getProducts();
      rootStore.query.setParam(ProductsSearchParams.page, String(this.paginationModel.currentPage));
    }
  );
}

export default ProductsStore;
