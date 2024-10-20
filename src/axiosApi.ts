import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'http://172.20.10.4:9999/api',
});
