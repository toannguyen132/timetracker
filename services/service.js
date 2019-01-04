import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { API_KEY, AUTH_DOMAIN, DATABASE_URL } from 'react-native-dotenv'
console.log('api key', API_KEY);
console.log('auth domain', AUTH_DOMAIN);
console.log('database url', DATABASE_URL);

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL
};

firebase.initializeApp(config);

export const projectRef = firebase.database().ref('/projects');
export const taskRef = firebase.database().ref('/tasks');

export default firebase;