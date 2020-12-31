import React, { useState, useEffect } from 'react'
import { socket } from '../../socket'
import { Button, createMuiTheme, makeStyles } from '@material-ui/core'
import { loadCart, cartEmpty } from '../common/helper/carthelper'
import UserBase from './UserBase'
import Animation from '../common/animation'
import { CheckCircle, CheckCircleOutline } from '@material-ui/icons'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#FF5544",
        },
        secondary: {
            main: "#FFFF88",
        },
    },
});
const useStyles = makeStyles((theme) => ({
    texts: {
        color: '#FFF',
    },
    check: {
        position: 'relative',
        margin: '0.2em 0.2em 0.2em 1.2em',
        top: '0.5em',
        fontSize: '2em',
        color: '#448844'
    },
}));
export default function OrderProcessingPage() {
    const classes = useStyles();
    const [message, setMessage] = useState('Processing Order')
    // const [error,setError] = useState('')
    useEffect(() => {

        let orderData = loadCart()
        socket.emit('orderPlaced', { orderData })

        socket.on('responseToUser', (data) => {
            cartEmpty()
            console.log(data)
            setMessage(data.message)
        })

        socket.on('errorMessage', (err) => {
            console.log(err)
            // setError(err)
        })

    }, [])

    return (
        <UserBase isSignedIn={true}>
            {message == 'Processing Order' &&
                <div className={classes.texts}>
                    <CheckCircle className={classes.check} />Processing Order
                    <CheckCircleOutline className={classes.check} />Order sent to restaurant
                </div>
            }
            {message == 'order is saved.waiting for restaurant update' &&
                <div className={classes.texts}>
                    <CheckCircle className={classes.check} />Processing Order<br />
                    <CheckCircle className={classes.check} />Order sent to restaurant<br />
                    <CheckCircleOutline className={classes.check} />Restaurant has accepted the Order<br />
                </div>
            }
            {message == 'restaurant has accepted the order' &&
                <div className={classes.texts}>
                    <CheckCircle className={classes.check} />Processing Order<br />
                    <CheckCircle className={classes.check} />Order sent to restaurant<br />
                    <CheckCircle className={classes.check} />Restaurant has accepted the Order<br />
                    <CheckCircleOutline className={classes.check} />Valet assigned

                </div>
            }
            {message.match(/valet named/) != undefined &&
                <div className={classes.texts}>
                    <CheckCircle className={classes.check} />Processing Order<br />
                    <CheckCircle className={classes.check} />Order sent to restaurant<br />
                    <CheckCircle className={classes.check} />Restaurant has accepted the Order<br />
                    <CheckCircle className={classes.check} />Valet assigned
                </div>
            }
            <Animation></Animation>
        </UserBase>
    )


}