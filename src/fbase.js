import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  doc,
  deleteDoc,
  collection,
  updateDoc,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SEMDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth();
authService.languageCode = "kr";

export const createAccount = (email, password) =>
  createUserWithEmailAndPassword(authService, email, password);

export const socialLogIn = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(authService, provider);
};

export const logout = () => {
  signOut(authService);
};

export const dbService = getFirestore();

export const addTweet = async (tweet, url, uid) => {
  try {
    await addDoc(collection(dbService, "tweets"), {
      tweet,
      url,
      createdAt: Date.now(),
      creatorId: uid,
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const deleteTweet = async (id) => {
  await deleteDoc(doc(dbService, "tweets", id));
};

export const updateTweet = async (id, newTweet) => {
  await updateDoc(doc(dbService, "tweets", id), { tweet: newTweet });
};

const storageService = getStorage();

export const uploadImage = async (uid, attachment) => {
  const imageRef = ref(storageService, `${uid}/${uuidv4()}`);
  const response = await uploadString(imageRef, attachment, "data_url");
  return response;
};

export const getUrl = async (path) => {
  const response = await getDownloadURL(ref(storageService, path));
  return response;
};

export const deleteImage = async (url) => {
  const response = await deleteObject(ref(storageService, url));
};
