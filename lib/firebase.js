import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAdelrMSwdEfu-RI-Mom5DJNrT8pVX8VYY",
    authDomain: "budgetly-e57bf.firebaseapp.com",
    databaseURL: "https://budgetly-e57bf.firebaseio.com",
    storageBucket: "budgetly-e57bf.appspot.com",
    messagingSenderId: "538836744372"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
