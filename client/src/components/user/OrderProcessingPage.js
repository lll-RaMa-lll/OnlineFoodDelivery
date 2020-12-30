import React, { useState, useEffect } from 'react'
import { socket } from '../../socket'
import { Button } from '@material-ui/core'
import { loadCart, cartEmpty } from '../common/helper/carthelper'
import UserBase from './UserBase'

export default function OrderProcessingPage() {

    const [message, setMessage] = useState('Order Processing...')
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
            {message == 'Order sent to restaurant' &&
                <div>
                    <h1>{message}</h1>
                </div>
            }
            {message == 'Order accepted by restaurant' &&
                <div>

                </div>
            }
            {message == 'Valet assigned' &&
                <div>

                </div>
            }
            {message == 'Order placed' &&
                <div>

                </div>
            }
        </UserBase>
    )


}