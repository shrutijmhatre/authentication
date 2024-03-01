import axios from 'axios';
import qs from 'qs';

export const gatewayClient = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      arrayFormat: 'repeat',
      encode: false
    });
  }
});
