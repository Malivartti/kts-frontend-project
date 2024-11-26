
export const API_ENTRY_POINT = 'https://api.escuelajs.co/api/v1';

export const endpoints = {
  products: {
    get: (): string => `${API_ENTRY_POINT}/products`,
    create: () => `${API_ENTRY_POINT}/products`,
    update: (id: string | number) => `${API_ENTRY_POINT}/products/${id}`,
    delete: (id: string | number) => `${API_ENTRY_POINT}/products/${id}`,
  },
  product: {
    getProduct: (id: string | number): string => `${API_ENTRY_POINT}/products/${id}`,
  },
  categoryes: {
    getCategoryes: (): string => `${API_ENTRY_POINT}/categories`,
  },
  user: {
    getAccessToken: (): string => `${API_ENTRY_POINT}/auth/login`,
    refreshToken: (): string => `${API_ENTRY_POINT}/auth/refresh-token`,
    get: (): string => `${API_ENTRY_POINT}/auth/profile`,
    create: (): string => `${API_ENTRY_POINT}/users`,
    update: (id: string): string => `${API_ENTRY_POINT}/users/${id}`,
    checkEmail: (): string => `${API_ENTRY_POINT}/users/is-available`,
  },
};