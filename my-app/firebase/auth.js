import { auth } from './firebase.js';

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignwithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}
export const doSignWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result =  await signInWithPopup(auth, provider);
    return result;
}

export const doSignOut = async () => {
    return auth.signOut();
}

