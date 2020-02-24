import React from 'react';
import CollectionOverview  from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component'
import { firestore,convertCollectionSnapshotToMap } from '../../firebase/firebase.utils'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions'
import  WithSpinner  from '../../components/with-spinner/with-spinner.components'

const ComponentOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends React.Component{

    constructor(){
        super();

        this.state = {
            loading:true
        }
    }
    unsubscribeFromSnapshot = null 
    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collection')

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading:false})
        })
    }
    render(){
        const { match } = this.props
        const { loading } = this.state
        return (
            <div className='shop-page'>
                {/* <Route exact path={`${match.path}`} component={CollectionOverview}/> */}
                <Route exact path={`${match.path}`} render={(props)=> <ComponentOverviewWithSpinner {...props} isLoading={loading} />}/>
                {/* <Route  path={`${match.path}/:collectionId`} component={CollectionPage}/> */}
                <Route  path={`${match.path}/:collectionId`} render={(props)=> <CollectionPageWithSpinner {...props} isLoading={loading}/>}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections:collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null,mapDispatchToProps)(ShopPage);