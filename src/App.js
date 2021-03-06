import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import { connect } from 'react-redux'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import { selectCurrentUser } from './redux/user/user.selector'
import { createStructuredSelector } from'reselect'
import CheckoutPage from './pages/checkout/checkout.component'

import { checkUserSession } from './redux/user/user.actions'
class  App extends React.Component {



  componentDidMount(){
    const { checkUserSession } = this.props;
    checkUserSession()
  }

  unsubscribeFromAuth = null;

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }



  render(){
    return (
      <div>
        <Header />
          <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={()=>
             this.props.currentUser  ? (<Redirect to='/' />) : (<SignInAndSignUp/>)
          }  />
        </Switch>
  
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession:() => dispatch(checkUserSession())
})


export default connect(mapStateToProps,mapDispatchToProps)(App);
