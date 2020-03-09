import React from 'react';
import { connect } from 'react-redux';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { ReactComponent as Logo } from '../../assets/crown.svg';

// import { HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer } from './header.styles'
import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from './header.styles';

import { signOutStart } from '../../redux/user/user.actions';


const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer >
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink to='/shop'>
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionLink as='div' onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
        // <OptionDiv onClick={() => auth.signOut()}>
        //   SIGN OUT
        // </OptionDiv>
      ) : (
        <OptionLink to='/signin'>
          SIGN IN
        </OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden
// });


const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  hidden:selectCartHidden
})

const mapDispatchToProps = dispatch => ({
  signOutStart : () => dispatch(signOutStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);