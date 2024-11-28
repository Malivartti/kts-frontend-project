import { CategoryApi, CategoryModel, normalizeCategories } from '@entities/Category';
import { Meta } from '@entities/Meta';
import { normalizeOption, OptionModel } from '@entities/Option';
import { normalizeProducts, ProductApi, ProductCreateApiReq, ProductModel, ProductUpdateApiReq } from '@entities/Product';
import { endpoints } from '@shared/configs/api';
import { getUniqueProperties } from '@shared/lib/objs';
import { onlyNumbers, validateUrlString } from '@shared/lib/validate';
import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

type PrivateField = '_products' | '_categories' | '_meta' | '_message'
| '_selectedProduct' | '_isShowModal' | '_modalType' | '_title' | '_titleError'
| '_description' | '_descriptionError' | '_price' | '_priceError' | '_category'
| '_images' | '_imagesError';

enum modalType {
  create = 'create',
  update = 'update',
}

class DashboardStore {
  private _products: ProductModel[] = [];
  private _categories: CategoryModel[] = [];
  private _meta: Meta = Meta.initial;
  private _message: string = '';
  private _selectedProduct: ProductModel | null = null;
  private _isShowModal: boolean = false;
  private _modalType: modalType = modalType.create;
  private _title: string = '';
  private _titleError: string = '';
  private _description: string = '';
  private _descriptionError: string = '';
  private _price: string = '';
  private _priceError: string = '';
  private _category: OptionModel[] = [];
  private _images: string[] = [''];
  private _imagesError: string[] = [''];
  

  constructor() {
    makeObservable<DashboardStore, PrivateField>(this, {
      _products: observable.ref,
      _categories: observable.ref,
      _meta: observable,
      _message: observable,
      _selectedProduct: observable,
      _isShowModal: observable,
      _modalType: observable,
      _title: observable,
      _titleError: observable,
      _description: observable,
      _descriptionError: observable,
      _price: observable,
      _priceError: observable,
      _category: observable,
      _images: observable,
      _imagesError: observable,
      products: computed,
      categories: computed,
      meta: computed,
      message: computed,
      isLoading: computed,
      isSuccess: computed,
      isError: computed,
      isShowModal: computed,
      title: computed,
      titleError: computed,
      description: computed,
      descriptionError: computed,
      price: computed,
      priceError: computed,
      category: computed,
      images: computed,
      imagesError: computed,
      totalProducts: computed,
      setIsShowModal: action.bound,
      openCreateModal: action.bound,
      openUpdateModal: action.bound,
      clearModal: action,
      setTitle: action.bound,
      setDescription: action.bound,
      setPrice: action.bound,
      setCategory: action.bound,
      setImages: action.bound,
      validateTitle: action,
      validateDescription: action,
      validatePrice: action,
      validateImages: action,
      isValide: action,
      getAllProducts: action,
      getCategoryes: action,
      checkAndSave: action,
      createProduct: action,
      updateProduct: action,
      deleteProduct: action,
      getUniquePropertiesForProductUpdate: action,
      deleteProductAndUpdate: action,
      loading: action,
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

  get message(): string {
    return this._message;
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

  get description(): string {
    return this._description;
  }

  get descriptionError(): string {
    return this._descriptionError;
  }

  get price(): string {
    return this._price;
  }

  get priceError(): string {
    return this._priceError;
  }

  get category(): OptionModel[] {
    return this._category;
  }

  get images(): string[] {
    return this._images;
  }

  get imagesError(): string[] {
    return this._imagesError;
  }

  get totalProducts(): number {
    return this._products.length;
  }

  setSelectedProduct(product: ProductModel): void {
    this._selectedProduct = product;
  }

  setIsShowModal(isShow: boolean): void {
    this._isShowModal = isShow;
  }

  openCreateModal(): void {
    this._modalType = modalType.create;
    this.clearModal();
    this._isShowModal = true;
  }

  openUpdateModal(): void {
    this.clearModal();
    this._modalType = modalType.update;
    this._title = this._selectedProduct.title;
    this._description = this._selectedProduct.description;
    this._category = [normalizeOption(this._selectedProduct.category)];
    this._price = String(this._selectedProduct.price);
    this._images = this._selectedProduct.images;
    this._isShowModal = true;
  }

  clearModal(): void {
    this._title = '';
    this._titleError = '';
    this._description = '';
    this._descriptionError = '';
    this._category = [];
    this._price = '';
    this._priceError = '';
    this._images = [''];
    this._imagesError = [''];
  }

  setTitle(title: string): void {
    if (this._titleError) {
      this._titleError = '';
    }
    this._title = title;
  }

  setDescription(description: string): void {
    if (this._descriptionError) {
      this._descriptionError = '';
    }
    this._description = description;
  }

  setPrice(price: string) : void {
    if (this._priceError) {
      this._priceError = '';
    }
    this._price = price;
  }

  setCategory(category: OptionModel[]): void {
    this._category = category;
  }

  setImages(images: string[]): void {
    const newImages = [images[0], ...images.slice(1).filter(Boolean)];

    if (this._imagesError.find(Boolean)) {
      const newImagesError = [...this.imagesError.slice(0, newImages.length)];
      for (let i = 0; i < this._images.length; i++) {
        if (images[i] !== this._images[i]) {
          newImagesError[i] = '';
          this._imagesError = newImagesError;
          this._imagesError = newImagesError;
          break;
        }
      }
    }

    this._images = newImages;
  }

  validateTitle(): boolean {
    if (!this._title.trim()) {
      this._titleError = 'Введите заголовок';
      return;
    }
    return true;
  }

  validateDescription(): boolean {
    if (!this._description.trim()) {
      this._descriptionError = 'Введите описание';
      return;
    }
    return true;
  }

  validatePrice(): boolean {
    if (!this._price) {
      this._priceError = 'Введите цену';
      return;
    }
    if (!onlyNumbers(this._price.trim())) {
      this._priceError = 'Используйте только цифры';
      return;
    }
    return true;
  }

  validateImages(): boolean {
    const newImagesError: string[] = [];
    let isValid = true;
    this._images.forEach((image, i) => {
      newImagesError[i] = '';
      if (!image.trim()) {
        newImagesError[i] = 'Введите ссылку на фото';
        isValid = false;
        return;
      }
      if (!validateUrlString(image)) {
        newImagesError[i] = 'Неверный формат';
        isValid = false;
        return;
      }
    });

    this._imagesError = newImagesError;
    return isValid;
  }

  isValide(): boolean {
    const isValideTitle = this.validateTitle();
    const isValidDescription = this.validateDescription();
    const isValidPrice = this.validatePrice();
    const isValidImages = this.validateImages();

    return isValideTitle && isValidDescription && isValidPrice && isValidImages;
  }

  async checkAndSave(): Promise<void> {
    const isValid = this.isValide();
    if (!isValid) return;

    if (this._modalType === modalType.create) {
      await this.createProduct();
    } else {
      await this.updateProduct();
    }
    await this.getAllProducts();
    if (this._meta === Meta.success) {
      this._isShowModal = false;
    }
  }

  loading(): void {
    this._meta = Meta.loading;
    this._message = '';
  }

  async createProduct(): Promise<void> {
    const url = endpoints.products.create();
    const data: ProductCreateApiReq = {
      title: this._title,
      description: this._description,
      price: Number(this._price),
      categoryId: Number(this._category[0].key),
      images: this._images,
    };
    this.loading();

    try {
      await axios({
        method: 'post',
        url,
        data,
      });

      runInAction(() => {
        this._message = 'Продукт успешно добавлен';
        this._meta = Meta.success;
      });
    } catch (e) {
      runInAction(() => {
        this._message = 'Не удалось добавить продукт';
        this._meta = Meta.error;
      });
      console.log(e);
    }
  }

  async getAllProducts(): Promise<void> {
    const url = endpoints.products.get();
    this._products = [];
    this.loading();

    try {
      const res: AxiosResponse<ProductApi[]> = await axios({
        method: 'get',
        url,
      });
      
      runInAction(() => {
        this._products = normalizeProducts(res.data);
        this._message = '';
        this._meta = Meta.success;
      });
    } catch(e) {
      runInAction(() => {
        this._message = 'Не удалось получить продукты';
        this._meta = Meta.error;
      });
      console.log(e);
    }
  }

  getUniquePropertiesForProductUpdate(): ProductUpdateApiReq {
    const oldObj: Required<ProductUpdateApiReq> = {
      title: this._selectedProduct.title,
      description: this._selectedProduct.description,
      price: this._selectedProduct.price,
      categoryId: this._selectedProduct.category.id,
      images: this._selectedProduct.images,
    };

    const newObj: Required<ProductUpdateApiReq> = {
      title: this._title,
      description: this._description,
      price: Number(this._price),
      categoryId: Number(this._category[0].key),
      images: this._images,
    };

    return getUniqueProperties(oldObj, newObj);
  }

  async updateProduct(): Promise<void> {
    const url = endpoints.products.update(this._selectedProduct.id);
    const data: ProductUpdateApiReq = this.getUniquePropertiesForProductUpdate();
    if (!Object.keys(data)) return;
    this.loading();

    try {
      await axios({
        method: 'put',
        url,
        data,
      });
      runInAction(() => {
        this._message = 'Информация о продукте успешно обновлена';
        this._meta = Meta.success;
      });
    } catch (e) {
      runInAction(() => {
        this._message = 'Не удалось обновить информацию о продукте';
        this._meta = Meta.error;
      });
      console.log(e);
    }
  }

  async deleteProduct(): Promise<void> {
    if (this._selectedProduct === null) return;
    const url = endpoints.products.delete(this._selectedProduct.id);
    this.loading();

    try {
      await axios({
        method: 'delete',
        url,
      });
      runInAction(() => {
        this._message = 'Продукт успешно удален';
        this._meta = Meta.success;
      });
    } catch(e) {
      runInAction(() => {
        this._message = 'Не удалось удалить продукт';
        this._meta = Meta.error;
      });
      console.log(e);
    }
  }

  async deleteProductAndUpdate(): Promise<void> {
    await this.deleteProduct();
    if (this.isError) return;
    
    await this.getAllProducts();
  }


  async getCategoryes(): Promise<void> {
    const url = endpoints.categoryes.getCategoryes();
    this._categories = [];

    try {
      const res: AxiosResponse<CategoryApi[]> = await axios({
        method: 'get',
        url,
      });
      runInAction(() => {
        this._categories = normalizeCategories(res.data);
      });
    } catch(e) {
      alert(e);
    } 
  }
}



export default DashboardStore;
