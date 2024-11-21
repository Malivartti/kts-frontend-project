
export const API_ENTRY_POINT = 'https://api.escuelajs.co/api/v1';

export const endpoints = {
  products: {
    getProducts: (): string => `${API_ENTRY_POINT}/products`,
  },
  product: {
    getProduct: (id: string): string => `${API_ENTRY_POINT}/products/${id}`,
  },
  categoryes: {
    getCategoryes: (): string => `${API_ENTRY_POINT}/categories`,
  },
};