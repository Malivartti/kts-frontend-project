import axios from 'axios';

import { API_ENTRY_POINT } from '@/configs/api';

export async function getProduct(productId: number) {
  const url = API_ENTRY_POINT + 'products/' + productId;
  console.log(url);
  const res = await axios({
    method: 'get',
    url
  });
  console.log(res);
  return res.data;
}