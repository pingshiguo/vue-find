import axios from 'axios';
import { HOST, PORT } from './config';

axios.defaults.baseURL = `${HOST}:${PORT}`;

export function getPageInfo () {
  const url = '/nrClassifyShow/lists';

  return axios.get(url).then(res => {
    return Promise.resolve(res.data);
  });
}

export function getImages (categoryId) {
  const url = '/nrClassifyShowResource/listsPicture';

  return axios.get(url, {
    params: {
      classifyShowId: categoryId
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function searchImages (value, categoryId) {
  const url = '/nrClassifyShowResource/listsPicture';

  return axios.get(url, {
    params: {
      name: value,
      classifyShowId: categoryId
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function getVideos (categoryId) {
  const url = '/nrClassifyShowResource/listsVideo';

  return axios.get(url, {
    params: {
      classifyShowId: categoryId
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function searchVideos (value, categoryId) {
  const url = '/nrClassifyShowResource/listsVideo';

  return axios.get(url, {
    params: {
      name: value,
      classifyShowId: categoryId
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function getBooks (categoryId) {
  const url = '/nrClassifyShowResource/listsFiction';

  return axios.get(url, {
    params: {
      classifyShowId: categoryId
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function searchBooks (value, categoryId) {
  const url = '/nrClassifyShowResource/listsFiction';

  return axios.get(url, {
    params: {
      name: value,
      classifyShowId: categoryId
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function getGallery (galleryId) {
  const url = '/nrPictureResourceText/getAllChapter';

  return axios.get(url, {
    params: {
      classifyShowResourceId: galleryId
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function getVideo (videoId) {
  const url = '/nrVideoResourceText/getAllChapter';

  return axios.get(url, {
    params: {
      classifyShowResourceId: videoId
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function getBook (bookId) {
  const url = '/nrFictionResourceText/getAllChapter';

  return axios.get(url, {
    params: {
      classifyShowResourceId: bookId
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function getBookCatalog (catalogId) {
  const url = '/nrFictionResourceText/resource';

  return axios.get(url, {
    params: {
      id: catalogId
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function goPreCatalog (bookId, catalogId) {
  const url = '/nrFictionResourceText/getFictionUp';

  return axios.get(url, {
    params: {
      classifyShowResourceId: bookId,
      id: catalogId
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function goNextCatalog (bookId, catalogId) {
  const url = '/nrFictionResourceText/getFictionDown';

  return axios.get(url, {
    params: {
      classifyShowResourceId: bookId,
      id: catalogId
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}
