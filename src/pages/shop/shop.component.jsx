import React from 'react';
import CollectionOverview  from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component'
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'
import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions'
import { selectCollectionFetching,selectCollectionLoaded } from '../../redux/shop/shop.selector'
import { connect } from 'react-redux'
import  WithSpinner  from '../../components/with-spinner/with-spinner.components'
const ComponentOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends React.Component{

    componentDidMount(){
        const { fetchCollectionStartAsync } = this.props;
        fetchCollectionStartAsync()
    }
    render(){
        const { match } = this.props
        const { isCollectionFetching,isCollectionLoaded } = this.props
        return (
            <div className='shop-page'>
                {/* <Route exact path={`${match.path}`} component={CollectionOverview}/> */}
                <Route exact path={`${match.path}`} render={(props)=> <ComponentOverviewWithSpinner {...props} isLoading={isCollectionFetching} />}/>
                {/* <Route  path={`${match.path}/:collectionId`} component={CollectionPage}/> */}
                <Route  path={`${match.path}/:collectionId`} render={(props)=> <CollectionPageWithSpinner {...props} isLoading={!isCollectionLoaded}/>}/>
            </div>
        )
    }
}

const mapStateToPros  = createStructuredSelector({
    isCollectionFetching:selectCollectionFetching,
    isCollectionLoaded:selectCollectionLoaded
})
const mapDispatchToProps = dispatch => ({
    fetchCollectionStartAsync : () => dispatch(fetchCollectionStartAsync())
})


export default connect(mapStateToPros,mapDispatchToProps)(ShopPage);