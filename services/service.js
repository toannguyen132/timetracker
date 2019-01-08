import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

class Api {

  _getUrl(path) {
    return `${API_URL}${path}`;
  }

  get(path, query = {}) {
    return axios.get(this._getUrl(path), {
      params: query
    })
    .then(resp => resp.data);
  }

  post(path) {
    return axios.post(this._getUrl(path), {
      query
    })
    .then(resp => resp.data);
  }

  update() {

  }

  delete() {

  }
}

const api = new Api();

export default api;


// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// import { API_KEY, AUTH_DOMAIN, DATABASE_URL } from 'react-native-dotenv'
// console.log('api key', API_KEY);
// console.log('auth domain', AUTH_DOMAIN);
// console.log('database url', DATABASE_URL);

// const config = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DATABASE_URL
// };

// firebase.initializeApp(config);

// export const projectRef = firebase.database().ref('/projects');
// export const taskRef = firebase.database().ref('/tasks');

// export default firebase;