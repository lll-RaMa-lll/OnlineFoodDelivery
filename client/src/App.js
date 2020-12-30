import React, { Component } from "react";
import "./index.css";
import { UserCustomerSignUpForm } from './components/signup-forms/UserCustomerSignUpForm'
import { UserRestaurantSignUpForm } from './components/signup-forms/UserRestaurantSignUpForm'
import { UserValetSignUpForm } from './components/signup-forms/UserValetSignUpForm'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './components/user/Home'
import RestaurantDashboard from './components/restaurant/RestaurantDashboard'
import MediaCard from "./components/common/foodCard";
import RestaurantHome from "./components/restaurant/RestaurantHome"
import ValetHome from "./components/valet/ValetHome"
import UserDashboard from "./components/user/UserDashboard"
import OrderPage from './components/user/OrderPage'
import OrderPageAuthenticated from './components/user/OrderPageAuthenticated'
import ValetDashboard from './components/valet/ValetDashboard'
import CustomerRoute from './components/auth/helper/CustomerRoute'
import RestaurantRoute from './components/auth/helper/RestaurantRoute'
import ValetRoute from './components/auth/helper/ValetRoute'
import OrderProcessingPage from './components/user/OrderProcessingPage'
import ValetAcceptOrder from "./components/valet/ValetAcceptOrder";

class App extends Component {

  constructor() {
    super()
    // we will use redux for our state management
    this.state = {

    }

  }

  render() {
    return (
      <Router>
        <div className='base-class'>
          <Switch>
            {/* <Route path='/userSignup' exact component={()=><Form className='usersignup'/>} /> */}
            <Route path='/' exact component={Homepage} />
            <Route path='/user-customer-signup' exact component={UserCustomerSignUpForm} />
            <Route path='/user-restaurant-signup' exact component={UserRestaurantSignUpForm} />
            <Route path='/user-valet-signup' exact component={UserValetSignUpForm} />
            <Route path='/success' exact component={Finished} />
            <RestaurantRoute path='/restaurant/home' exact component={RestaurantDashboard} />
            <Route path='/card' exact component={MediaCard} />
            <Route path='/restaurant' exact component={RestaurantHome} />
            <Route path='/valet' exact component={ValetHome} />
            <CustomerRoute path='/home' exact component={UserDashboard} />
            <CustomerRoute path='/home/order/restaurants/:restaurantId' exact component={OrderPageAuthenticated} />
            <Route path = '/restaurants/:restaurantId' exact component={OrderPage} />
            <ValetRoute path='/valet/home' exact component={ValetDashboard} />
            <CustomerRoute path='/home/order/process' exact component={OrderProcessingPage}/>
            <Route path='/test' exact component={ValetAcceptOrder} />
          </Switch>
        </div>

      </Router>
    );
  }

}


function Finished() {
  return (
    <h1 style={{ display: 'flex', justifyContent: 'center' }} >Account creation is successful!</h1>
  )
}

export default App;
