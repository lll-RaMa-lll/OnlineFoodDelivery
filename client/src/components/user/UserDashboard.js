import React,{useEffect} from 'react'
import {Button} from '@material-ui/core'
import {socket} from '../../socket'



function UserDashboard({history}){

    useEffect(()=>{
        socket.emit('customerConnection',{name:'someone'},(response)=>{
            console.log(response)
        })


    },[])

    let clickHandler = ()=>{
        history.push('/home/order')
    }

    return(
        <div>
            <Button
                variant='outlined'
                color='secondary'
                onClick={clickHandler}
            >
            Place Order
            </Button>
        </div>
    )

}

export default UserDashboard