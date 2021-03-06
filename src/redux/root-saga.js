import {call, all} from 'redux-saga/effects'

import {fetchCollectionStart} from './shop/shop.saga'
import {userSagas} from './user/user.saga'

import { cartSagas } from './cart/cart.saga'

export default function* rootSaga(){
    yield all([call(fetchCollectionStart), call(userSagas),call(cartSagas)])
}
