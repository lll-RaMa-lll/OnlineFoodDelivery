import { CenterFocusStrong } from '@material-ui/icons'
import React ,{ useState} from 'react'
import {socket} from '../../socket'
import {Button} from '@material-ui/core'
import { Check, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { isAutheticated } from '../auth/helper';


const useStyles = makeStyles({
    buttonsAccept: {
        border: "1px solid #888",
        borderRadius: "3em",
        margin: "1em 2em",
        color: "#44FF44",
    },
    buttonReject: {
        border: "1px solid #888",
        borderRadius: "3em",
        margin: "1em 0em",
        color: "#FF5544",
    }
})



export default function ValetAcceptOrder(props){

    let {user,token} = isAutheticated('valet')
    const handleYes=()=>{
        socket.emit('responseToServerRegardingOrderFromValet',{hasAcceptedOrder:true,name:user.name})
    }

    const handleNo=()=>{
        
        socket.emit('responseToServerRegardingOrderFromValet',{hasAcceptedOrder:false,name:user.name})
    }

    const classes = useStyles();
    return(
        <div>
            <h1 style={{display:'flex',justifyContent:'center'}}>Would you accept the order?</h1>
            <div style={{display:'flex',justifyContent:'space-around'}}>
                <Button className={classes.buttonsAccept} onClick={handleYes}><Check /></Button>
                <Button className={classes.buttonReject} onClick={handleNo}><Close /></Button>
            </div>
        </div>
    )
}