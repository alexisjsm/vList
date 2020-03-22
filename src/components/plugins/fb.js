import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBainoeL405ER1XV4D-FeZQVcbe3P6Cdw8',
  authDomain: 'vlist-35b34.firebaseapp.com',
  databaseURL: 'https://vlist-35b34.firebaseio.com',
  projectId: 'vlist-35b34',
  storageBucket: 'vlist-35b34.appspot.com',
  messagingSenderId: '102487736115',
  appId: '1:102487736115:web:aa2db8fa7c95bc194fc846'
}

const app = Firebase.initializeApp(config)

export const db = app.firestore()
