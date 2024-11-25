import { ProductModel } from '@entities/Product';

export interface BugProductModel extends ProductModel {
  count: number;
}