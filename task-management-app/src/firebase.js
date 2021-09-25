import {initializeApp} from 'firebase/app';

import {getDatabase} from "firebase/database";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGfc9IbvCVCEn27WHaEZTH3wwJNNtwS3k",
  authDomain: "task-management-app-ff44a.firebaseapp.com",
  projectId: "task-management-app-ff44a",
  storageBucket: "task-management-app-ff44a.appspot.com",
  messagingSenderId: "398165128494",
  appId: "1:398165128494:web:e3d4b219c51dbefc9e76bf",
  databaseURL:  "https://task-management-app-ff44a-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app, firebaseConfig.databaseURL);

export default db;