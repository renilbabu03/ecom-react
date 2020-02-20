import React from 'react';
import CollectionOverview  from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component'
import { firestore,convertCollectionSnapshotToMap } from '../../firebase/firebase.utils'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions'


class ShopPage extends React.Component{
    unsubscribeFromSnapshot = null 
    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collection')

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            updateCollections(collectionsMap)
        })
    }
    render(){
        const { match } = this.props
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionOverview}/>
                <Route  path={`${match.path}/:collectionId`} component={CollectionPage}/>
                {/* <CollectionOverview/> */}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections:collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null,mapDispatchToProps)(ShopPage);