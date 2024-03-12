import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDLgEIRcteeQwPjGZNlTxcveuxcSCQZPyc',
  authDomain: 'icecreams-bd120.firebaseapp.com',
  projectId: 'icecreams-bd120',
  storageBucket: 'icecreams-bd120.appspot.com',
  messagingSenderId: '976275711032',
  appId: '1:976275711032:web:103d121c4fcc2e7032b2cd',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
