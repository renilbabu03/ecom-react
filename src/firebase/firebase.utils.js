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

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef)

    const batch = firestore.batch();
    objectsToAdd.forEach(obj=>{
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj)
    })
    return await batch.commit()
}

export const convertCollectionSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc=>{
        const { title , items }  = doc.data();

        return { 
            title,
            items,
            routeName:encodeURI(title.toLowerCase()),
            id:doc.id

        }
    })

    return transformedCollection.reduce((accumulator,collection)=>{
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve,reject)=>{
        const unsubscribe = auth.onAuthStateChanged(userAuth=>{
            unsubscribe();
            resolve(userAuth)
        },reject)
    })
}

export default firebase