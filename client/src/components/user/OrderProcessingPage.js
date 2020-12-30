import React,{useState,useEffect} from 'react'
import {socket} from '../../socket'
import {Button} from '@material-ui/core'
import {loadCart,cartEmpty } from '../common/helper/carthelper'

export default function OrderProcessingPage(){

    const [message,setMessage] = useState('Order Processing...')
    // const [error,setError] = useState('')
    useEffect(()=>{

        let orderData = loadCart()
        socket.emit('orderPlaced',{orderData})

        socket.on('responseToUser',(data)=>{
            cartEmpty()
            console.log(data)
            setMessage(data.message)
        })

        socket.on('errorMessage',(err)=>{
            console.log(err)
            // setError(err)
        })

    },[])
    
    return (
        <div>
            <h1>{message}</h1>
            {/* <h1>{error}</h1> */}
        </div>
    )


}