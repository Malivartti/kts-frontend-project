export const API_ENTRY_POINT = 'https://api.escuelajs.co/api/v1';

export const endpoints = {
  products: {
    getProducts: (): string => `${API_ENTRY_POINT}/products`,
    getCountProducts: (query: string): string => `${API_ENTRY_POINT}/products?${query}`,
    getPageProducts: (page: number, limit: number, query: string): string => `${API_ENTRY_POINT}/products?offset=${(page - 1) * limit}&limit=${limit}&${query}`,
  },
  product: {
    getProduct: (id: string): string => `${API_ENTRY_POINT}/products/${id}`,
  },
  categoryes: {
    getCategoryes: (): string => `${API_ENTRY_POINT}/categories`,
  },
};