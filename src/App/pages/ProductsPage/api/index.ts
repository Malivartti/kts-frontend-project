import axios from 'axios';

import { endpoints } from '@/configs/api';
import { IProduct } from '@/entities/Product';

export async function getProducts(): Promise<IProduct[]> {
  const url = endpoints.products.getProducts();

  try {
    const res = await axios({
      method: 'get',
      url,
    });
    return res.data;
  } catch(e) {
    alert(e);
    return [];
  } 
}
