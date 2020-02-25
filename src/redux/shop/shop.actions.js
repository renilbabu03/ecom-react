import ShopActionTypes from './shop.types';
import { firestore , convertCollectionSnapshotToMap} from '../../firebase/firebase.utils'
export const fetchCollectionStart = () => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionSuccess = collectionsMap => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload:collectionsMap
})
export const fetchCollectionFailure = errorMessage => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload:errorMessage
})

export const fetchCollectionStartAsync = () => {
    return dispatch=>{
        const collectionRef = firestore.collection('collection')
        dispatch(fetchCollectionStart())
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            dispatch(fetchCollectionSuccess(collectionsMap))
        }).catch(e=>dispatch(fetchCollectionFailure(e.message)))
    }
}