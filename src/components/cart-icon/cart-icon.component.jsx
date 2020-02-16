import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { selectCartItemCount } from '../../redux/cart/cart.selectors'
import { createStructuredSelector } from 'reselect'
import { ItemCountStyles, ShoppingIconStyles, CartIconStyles } from './cart-icon.styles'

const CartIcon = ({ toggleCartHidden,itemCount }) => (
  <CartIconStyles onClick={toggleCartHidden}>
    <ShoppingIconStyles className='shopping-icon' />
    <ItemCountStyles>{itemCount}</ItemCountStyles>
  </CartIconStyles>
);

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector( {
    itemCount: selectCartItemCount
  })
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);