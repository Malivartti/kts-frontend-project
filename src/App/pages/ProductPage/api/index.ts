import axios from 'axios';

import { endpoints } from '@/configs/api';
import { IProduct } from '@/entities/Product';

export async function getProduct(productId: string = ''): Promise<IProduct> {
  const url = endpoints.product.getProduct(productId);

  try {
    const res = await axios({
      method: 'get',
      url,
    });
  
    return res.data;
  } catch (e) {
    alert(e);
    return {} as IProduct;
  }
}