import axios from 'axios';
import qs from 'qs';
import { HOST, PORT } from './config';

axios.defaults.baseURL = `${HOST}:${PORT}`;

axios.defaults.timeout = 5000;

axios.defaults.transformRequest = [data => {
  data = qs.stringify(data);
  return data;
}];

axios.defaults.transformResponse = [data => {
  data = JSON.parse(data);
  return data;
}];

axios.interceptors.request.use(config => {
  console.log('请求开始');
  return config;
}, err => {
  return Promise.reject(err);
});

axios.interceptors.response.use(res => {
  console.log('请求结束');
  return res;
}, err => {
  return Promise.reject(err);
});

export default function http (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      if (err === 'Error: timeout of 5000ms exceeded') {
        console.log('请求超时');
        return;
      }

      reject(err);
    });
  });
}
