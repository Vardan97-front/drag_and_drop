import axios from 'axios';
// import toFormData from 'object-to-formdata';
// import Storage from './helpers/storage';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// api.interceptors.request.use((config) => {
//   const c = config;
//   const token = Storage.getToken();
//   if (token) {
//     c.headers.authorization = token;
//   }
//   return c;
// }, Promise.reject);

class Api {
  static createTask(data) {
    return api.post('/tasks/', data);
  }

  static getTasks(status) {
    return api.get('/tasks/', {
      params: {
        status,
      },
    });
  }

  static getSingleTask(id) {
    return api.get('/tasks/single/task', {
      params: {
        id,
      },
    });
  }

  static editSingleItem(data) {
    return api.put('/tasks/', data);
  }

  static deleteItem(id) {
    return api.delete(`tasks/${id}`);
  }

  static changeStatus(status, id, oldIndex, newIndex) {
    return api.put('/tasks/status', {
      status, id, oldIndex, newIndex,
    });
  }
}

export default Api;
