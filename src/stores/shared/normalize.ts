import { IProduct } from '@/entities/Product';

const checkImages = (images: string[]): string[] => {
  const goodImages: string[] = [];
  images.forEach(image => {
    if (!(image.startsWith('[') || image.endsWith(']'))) {
      goodImages.push(image);
    }
  });

  return goodImages;
};

export const normalizeProuct = (raw: IProduct): IProduct => ({
  ...raw,
  images: checkImages(raw.images),
});

export const normalizeProducts = (raw: IProduct[]): IProduct[] => (
  raw.map(normalizeProuct)
);
