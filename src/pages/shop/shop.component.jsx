import React from 'react';
import CollectionsOverviewContainer  from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container'
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'
import { fetchCollectionStart } from '../../redux/shop/shop.actions'
import { connect } from 'react-redux'
class ShopPage extends React.Component{

    componentDidMount(){
        const { fetchCollectionStart } = this.props;
        fetchCollectionStart()
    }
    render(){
        const { match } = this.props
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
            <Route  path={`${match.path}/:collectionId`} component={CollectionPageContainer} />}/>
            </div>
        )
    }
}

const mapStateToPros  = createStructuredSelector({
})
const mapDispatchToProps = dispatch => ({
    fetchCollectionStart : () => dispatch(fetchCollectionStart())
})


export default connect(mapStateToPros,mapDispatchToProps)(ShopPage);