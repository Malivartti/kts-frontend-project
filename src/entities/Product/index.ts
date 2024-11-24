import { CategoryModel } from '@entities/Category';


export interface ProductModel {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryModel;
  images: string[]
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

export const normalizeProuct = (raw: ProductModel): ProductModel => ({
  ...raw,
  images: checkImages(raw.images),
});

export const normalizeProducts = (raw: ProductModel[]): ProductModel[] => (
  raw.map(normalizeProuct)
);
