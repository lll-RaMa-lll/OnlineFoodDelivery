import React,{useState,useEffect} from 'react'
import {socket} from '../../socket'


export default function OrderPage(){

    useEffect(()=>{
        socket.emit('orderPlaced',{customerName:'someone',restaurantName:'someRestaurant'})
        
        socket.on('responseToUser',(data)=>{
            console.log(data)
        })

        socket.on('errorMessage',(err)=>{
            console.log(err)
        })

        
    },[])

    return(
        <div>
            <h1>Order Page</h1>
        </div>
    )
}