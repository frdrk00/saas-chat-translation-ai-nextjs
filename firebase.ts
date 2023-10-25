import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyD0X5m5eepXCAye9V4oHD5b7V7oikzerLE',
  authDomain: 'saas-translator-app-7b393.firebaseapp.com',
  projectId: 'saas-translator-app-7b393',
  storageBucket: 'saas-translator-app-7b393.appspot.com',
  messagingSenderId: '542868704479',
  appId: '1:542868704479:web:1b016c969b299f17932d6a',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app)
