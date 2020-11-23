import React, { Component } from "react";
import "./index.css";
import { UserCustomerSignUpForm } from './components/signup-forms/UserCustomerSignUpForm'
import { UserRestaurantSignUpForm } from './components/signup-forms/UserRestaurantSignUpForm'
import { UserValetSignUpForm } from './components/signup-forms/UserValetSignUpForm'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './components/Home'
import RestaurantDashboard from './components/restaurant/RestaurantDashboard'
import MediaCard from "./components/common/foodCard";
import RestaurantHOme from "./components/restaurant/RestaurantHome"
import ValetHome from "./components/valet/ValetHome"

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
            <Route path='/restaurant/home' exact component={RestaurantDashboard} />
            <Route path='/card' exact component={MediaCard} />
            <Route path='/restaurant' exact component={RestaurantHOme} />
            <Route path='/valet' exact component={ValetHome} />

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
