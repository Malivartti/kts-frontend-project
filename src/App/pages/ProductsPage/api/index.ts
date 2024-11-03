import axios from 'axios';

import { API_ENTRY_POINT } from '@/configs/api';

export async function getAllProducts() {
  const url = API_ENTRY_POINT + 'products';

  const res = await axios({
    method: 'get',
    url
  });

  return res.data;
}
