import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

const config = {
  apiKey: "AIzaSyASdpP3aKVVnkaYc90X6wzH16b8Gb9AsPs",
  authDomain: "comefollowme-dc2be.firebaseapp.com",
  databaseURL: "https://comefollowme-dc2be.firebaseio.com",
  projectId: "comefollowme-dc2be",
  storageBucket: "comefollowme-dc2be.appspot.com",
  messagingSenderId: "893449544859",
  appId: "1:893449544859:web:3a2e1f3deee376e6c6523e",
  measurementId: "G-RQ4T4T7ESJ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
export const functions = firebase.functions();
