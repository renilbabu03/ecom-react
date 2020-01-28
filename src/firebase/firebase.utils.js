import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBpl_ykDjkfnPcgiq1OvcDbWfSoMmZavGw",
    authDomain: "ecom-5f8ec.firebaseapp.com",
    databaseURL: "https://ecom-5f8ec.firebaseio.com",
    projectId: "ecom-5f8ec",
    storageBucket: "ecom-5f8ec.appspot.com",
    messagingSenderId: "474598861462",
    appId: "1:474598861462:web:d940ef32664e2dc394f0b7",
    measurementId: "G-WRP9870SHX"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth)return ;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(e){
            console.log('error',e)
        }
    }
    
    return userRef
}

export default firebase