import { ProductModel } from '@entities/Product';

export interface BagProductModel extends ProductModel {
  count: number;
}