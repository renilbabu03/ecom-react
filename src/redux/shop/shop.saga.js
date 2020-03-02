import { takeLatest, call, put } from 'redux-saga/effects'

import ShopActionTypes from './shop.types'

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils'

import {fetchCollectionSuccess,
    fetchCollectionFailure

} from './shop.actions'

export function* fetchCollectionAsync(){
   yield console.log('I am fired')

   try{
       const collectionRef = firestore.collection('collection');
       const snapshot = yield collectionRef.get();
       const collectionsMap = yield call(convertCollectionSnapshotToMap,snapshot);
       yield put(fetchCollectionSuccess(collectionsMap))
   }catch(e){
       yield put(fetchCollectionFailure(e.message))
   }
}

export function* fetchCollectionStart (){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionAsync)
}