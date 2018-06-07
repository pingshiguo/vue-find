import axios from 'axios';
import { HOST, PORT } from './config';

axios.defaults.baseURL = `${HOST}:${PORT}`;

export function getPageInfo () {
  const url = '/nrClassifyShow/lists';

  return axios.get(url).then(res => {
    return Promise.resolve(res.data);
  });
}
