import React from 'react';

import { connect } from 'react-redux'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import CartItem from '../cart-item/cart-item.component'
// import CustomButton from '../custom-button/custom-button.component';
import { createStructuredSelector } from'reselect'
import { withRouter }  from 'react-router-dom'
import { toggleCartHidden }  from '../../redux/cart/cart.actions'

import {CartDropDownStyles, CartItemStyles,   EmptyMessageStyles, CustomButtonWrapperStyles} from './cart-dropdown.styles'

const CartDropdown = ({cartItems, history, dispatch}) => (
  <CartDropDownStyles>
    <CartItemStyles>
      {
        cartItems.length  ? cartItems.map(cartItem=><CartItem key={cartItem.id} item={cartItem}/>)
        : <EmptyMessageStyles>Your Cart is empty</EmptyMessageStyles>
      }
   
    </CartItemStyles>
    <CustomButtonWrapperStyles onClick={()=> {
      history.push('/checkout')
      dispatch(toggleCartHidden())
    }
      }>GO TO CHECKOUT</CustomButtonWrapperStyles>
  </CartDropDownStyles>
);

// const mapStateToProps = state =>(
//   {
//     cartItems:selectCartItems(state)
//   }
// )
const mapStateToProps = createStructuredSelector(
  {
    cartItems:selectCartItems
  }
)

export default withRouter(connect(mapStateToProps,null)(CartDropdown));