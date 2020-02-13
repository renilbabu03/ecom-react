import React from 'react';
import CollectionOverview  from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component'

import { Route } from 'react-router-dom'
const ShopPage  = ({match}) => (
    <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionOverview}/>
        <Route  path={`${match.path}/:collectionId`} component={CollectionPage}/>
        {/* <CollectionOverview/> */}
    </div>
)


export default ShopPage;