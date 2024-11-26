import { CategoryModel } from '@entities/Category';
import { Meta } from '@entities/Meta';
import { normalizeProducts, ProductApi, ProductModel } from '@entities/Product';
import { endpoints } from '@shared/configs/api';
import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

type PrivateField = '_products' | '_categories' | '_meta' | '_error' 
| '_selectedProduct' | '_isShowModal' | '_modalType' | '_title' | '_titleError';

enum modalType {
  create = 'create',
  update = 'update',
}

class DashboardStore {
  private _products: ProductModel[] = [];
  private _categories: CategoryModel[] = [];
  private _meta: Meta = Meta.initial;
  private _error: string = '';
  private _selectedProduct: ProductModel | null = null;
  private _isShowModal: boolean = false;
  private _modalType: modalType = modalType.create;
  private _title: string = '';
  private _titleError: string = '';
  private _description: string = '';
  private _descriptionError: string = '';
  private _price: string = '';
  private _priceError: string = '';
  private _category: CategoryModel;
  private _categoryError: string = '';
  private _images: string[] = [];
  private _imagesError: string = '';
  

  constructor() {
    makeObservable<DashboardStore, PrivateField>(this, {
      _products: observable.ref,
      _categories: observable.ref,
      _meta: observable,
      _error: observable,
      _selectedProduct: observable,
      _isShowModal: observable,
      _modalType: observable,
      _title: observable,
      _titleError: observable,
      products: computed,
      categories: computed,
      meta: computed,
      error: computed,
      isLoading: computed,
      isSuccess: computed,
      isError: computed,
      isShowModal: computed,
      title: computed,
      titleError: computed,
      setIsShowModal: action.bound,
      openCreateModal: action.bound,
      openUpdateModal: action.bound,
      setTitle: action.bound,
    });
  }

  get products(): ProductModel[] {
    return this._products;
  }
  
  get categories(): CategoryModel[] {
    return this._categories;
  }

  get meta(): Meta {
    return this._meta;
  }

  get error(): string {
    return this._error;
  }

  get selectedProduct(): ProductModel {
    return this._selectedProduct;
  }

  get isLoading(): boolean {
    return this._meta === Meta.initial || this._meta === Meta.loading;
  }

  get isSuccess(): boolean {
    return this._meta === Meta.initial || this._meta === Meta.success;
  }

  get isError(): boolean {
    return this._meta === Meta.initial || this._meta === Meta.error;
  }

  get isShowModal(): boolean {
    return this._isShowModal;
  }

  get isCreateModel(): boolean {
    return this._modalType === modalType.create;
  }

  get isUpdateModal(): boolean {
    return this._modalType === modalType.update;
  }

  get title(): string {
    return this._title;
  }

  get titleError(): string {
    return this._titleError;
  }

  setSelectedProduct(product: ProductModel): void {
    this._selectedProduct = product;
  }

  setIsShowModal(isShow: boolean): void {
    this._isShowModal = isShow;
  }

  openCreateModal(): void {
    this._modalType = modalType.create;
    this._isShowModal = true;
  }

  openUpdateModal(): void {
    this._modalType = modalType.update;
    this._isShowModal = true;
  }

  setTitle(title: string): void {
    this._title = title;
  }

  async getAllProducts(): Promise<void> {
    const url = endpoints.products.get();
    this._products = [];
    this._meta = Meta.loading;

    try {
      const res: AxiosResponse<ProductApi[]> = await axios({
        method: 'get',
        url,
      });
      
      runInAction(() => {
        this._products = normalizeProducts(res.data);
        this._meta = Meta.success;
      });
    } catch(e) {
      runInAction(() => {
        this._meta = Meta.error;
      });
      console.log(e);
    }
  }

  async deleteProduct(): Promise<void> {
    if (this._selectedProduct === null) return;
    const url = endpoints.products.delete(this._selectedProduct.id);

    try {
      await axios({
        method: 'delete',
        url,
      });
      this._products = this._products.filter(product => product.id !== this.selectedProduct.id);
    } catch(e) {
      console.log(e);
    }
  }
}



export default DashboardStore;
