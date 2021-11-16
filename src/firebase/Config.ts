import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCLTjHtVlRDUFuyONp1yCe1Ti_hwHS34CA',
  authDomain: 'bloodgrid-1530242896290.firebaseapp.com',
  projectId: 'bloodgrid-1530242896290',
  messagingSenderId: '315990750269',
  appId: '1:315990750269:web:e1c59d6fec0e5c2114a654'
};

export const uiConfig = {
  signInFlow: 'popup',
  // Redirect to landing page after sign in is successful.
  signInSuccessUrl: '/home',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
