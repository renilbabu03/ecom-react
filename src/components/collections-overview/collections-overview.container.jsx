import { connect } from 'react-redux';
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { selectCollectionFetching } from '../../redux/shop/shop.selector'

import WithSpinner from '../with-spinner/with-spinner.components'

import CollectionsOverview from '../collections-overview/collections-overview.component'

const mapStateToProps = createStructuredSelector({
    isLoading:selectCollectionFetching
})

// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer