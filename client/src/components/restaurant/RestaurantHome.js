import React from 'react'
import {Button} from '@material-ui/core'
// import {UserRestaurantSignUp} from '../signup-forms/UserRestaurantSignUpForm'



export default function RestaurantHome(props){
    return (
        <div>
            <h1>hello from restaurant</h1>
            <br/>
            <Button
                color='secondary'
                variant='contained'
                onClick={()=>{props.history.push('/user-restaurant-signup')}}
            >Sign UP</Button>
            <Button
                color='secondary'
                variant='contained'
            >Sign In</Button>
        </div>
    )
}