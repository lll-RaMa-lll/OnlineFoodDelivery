import React,{Component} from "react";
import "./index.css";
import {Form} from './components/Form'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'


class  App extends Component{

  constructor(){
    super()
    // we will use redux for our state management
    this.state={

    }

  }

  render(){
    return (
      <Router>
        <div className='base-class'>
        <Switch>
          <Route path='/userSignup' exact component={()=><Form className='usersignup'/>} />
          <Route path='/success' exact component={Finished} />
        </Switch>
        </div>
      
      </Router>
    );
  }
  
}


function Finished(){
  return (
      <h1 style={{display:'flex',justifyContent:'center'}} >Account creation is successful!</h1>
  )
}

export default App;
