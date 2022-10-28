import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA6pLySpgHvjB8SFI-51Y19D675G0gQfzw',
  authDomain: 'netfix-clone-vkg.firebaseapp.com',
  projectId: "netfix-clone-vkg",
  storageBucket: "netfix-clone-vkg.appspot.com",
  messagingSenderId: "941497182281",
  appId: "1:941497182281:web:becf7465cb7a194d3d7798",
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
