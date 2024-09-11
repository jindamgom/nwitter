import firebase from "firebase/compat/app";
// import "firebase/auth";
// fb 9 이상에서 다른 방식으로 임포트하고 사용해야한다..
import "firebase/compat/auth";
import "firebase/compat/firestore";
// 사진 저장을 위한 파이어베이스 스토리지 임포트
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();

// export default firebase.initializeApp(firebaseConfig);