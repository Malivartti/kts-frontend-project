import { ProductModel } from '@entities/Product';

export interface CategoryApi {
  id: number;
  name: string;
  image: string
  creationAt: string;
  updatedAt: string;
}

export interface CategoryModel {
  id: number;
  name: string;
  image: string
  creationAt: Date;
  updatedAt: Date;
}

const normalizeCategory = (raw: CategoryApi): CategoryModel => ({
  ...raw,
  creationAt: new Date(raw.creationAt),
  updatedAt: new Date(raw.updatedAt),
});

export const normalizeCategories = (raw: CategoryApi[]): CategoryModel[] => (
  raw.map(normalizeCategory)
);

export const categoryAndProducts = (row: ProductModel[]): Record<string, number> => {
  const obj: Record<string, number> = {};
  row.forEach(product => {
    const normalizeName = product.category.name.toLocaleLowerCase();
    if (!(normalizeName in obj)) {
      obj[normalizeName] = 0;
    }
    obj[normalizeName]++;
  });
  return obj;
};
