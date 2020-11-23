import React from 'react'
import {Button} from '@material-ui/core'



export default function ValetHome(props){
    return (
        <div>
            <h1>hello from restaurant</h1>
            <br/>
            <Button
                color='secondary'
                variant='contained'
                onClick={()=>{props.history.push('/user-valet-signup')}}
            >Sign UP</Button>
            <Button
                color='secondary'
                variant='contained'
            >Sign In</Button>
        </div>
    )
}