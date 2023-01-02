import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGEING_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env"

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGEING_SENDER_ID,
  appId: FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)
const fireStore = getFirestore(firebaseApp)

export { fireStore }
