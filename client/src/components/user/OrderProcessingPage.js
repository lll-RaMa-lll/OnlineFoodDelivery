import React, { useState, useEffect } from 'react'
import { socket } from '../../socket'
import { Button } from '@material-ui/core'
import { loadCart, cartEmpty } from '../common/helper/carthelper'
import UserBase from './UserBase'

export default function OrderProcessingPage() {

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
                <div>
                    <h1>{message}</h1>
                </div>
            }
            {message == 'order is saved.waiting for restaurant update' &&
                <div>
                    <h1>Order sent to restaurant</h1>
                </div>
            }
            {message == 'restaurant has accepted the order' &&
                <div>
                    <h1>Restaurant has accepted the Order</h1>
                </div>
            }
            {message.match(/valet named [A-Za-z]* has accepted the order/) != undefined &&
                <div>
                    <h1>Valet assigned</h1>
                </div>
            }
        </UserBase>
    )


}