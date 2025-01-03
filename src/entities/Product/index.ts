import { CategoryModel } from '@entities/Category';
import { formatDDMMYYYY } from '@shared/lib/date';

export interface ProductApi {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryModel;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface ProductModel {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryModel;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
}

export interface ProductCreateApiReq {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface ProductUpdateApiReq {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string[];
}

const checkImages = (images: string[]): string[] => {
  const goodImages: string[] = [];
  images.forEach(image => {
    if (!(image.startsWith('[') || image.endsWith(']'))) {
      goodImages.push(image);
    }
  });

  return goodImages;
};

const normalizeImage = (image: string): string => {
  return image.replaceAll('"', '').replaceAll('\'', '').replaceAll('[', '').replaceAll(']', '');
};

const normalizeImages = (images: string[]): string[] => {
  return images.map(normalizeImage);
};

export const normalizeProuct = (raw: ProductApi): ProductModel => ({
  ...raw,
  creationAt: new Date(raw.creationAt),
  updatedAt: new Date(raw.updatedAt),
  images: normalizeImages(raw.images),
});

export const normalizeProducts = (raw: ProductApi[]): ProductModel[] => (
  raw.map(normalizeProuct)
);

export const dayAndProducts = (row: ProductModel[]): Record<string, number> => {
  const obj: Record<string, number> = {};
  row.forEach(product => {
    const normalizeDate = formatDDMMYYYY(product.creationAt);
    if (!(normalizeDate in obj)) {
      obj[normalizeDate] = 0;
    }
    obj[normalizeDate]++;
  });
  return obj;
};