import React, { Component, useEffect, useState } from "react";
import { styled, makeStyles } from '@material-ui/core/styles';
import OrderCard from "../common/orderCard";
// import Profile from "../common/profile";
import { socket } from '../../socket'
import { isAutheticated, signout } from '../auth/helper'
import RestaurantBase from './RestaurantBase'

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: "center",
        color: "#FFF",
        borderBottom: "1px solid #FFF"
    }
}));
export default function RestaurantDashboard({ history }) {

    let { user, token } = isAutheticated('restaurant')
    const [orders, setOrders] = useState([])

    useEffect(() => {
        socket.emit('restaurantConnection', { id: user._id, name: user.name }, (response) => {
            console.log(response)
        })

        socket.on('orderForRestaurant', (data) => {
            // let isAcceptingOrder = prompt('will you accept this order')
            
            console.log('order data from backend',data)
            // setOrders(pre=>{
            //     pre.push(data)
            //     return pre
            // })
            setOrders([...orders,data])
            console.log('orders till now', orders)

            // let answer= prompt('would you accept the order?')
            // console.log('answer:',answer)
            // let isAcceptingOrder = false
            // if(answer==='yes') isAcceptingOrder = true


        })

        socket.on('responseToRestaurantRegardingValetInformation', (data) => {
            console.log(data)
        })


    }, [])

    
    const handleYes=()=>{
        setVisible(false)
        socket.emit('responseToServerRegardingOrderFromRestaurant',{isAcceptingOrder:true})
    }

    const handleNo=()=>{
        setVisible(false)
        socket.emit('responseToServerRegardingOrderFromRestaurant',{isAcceptingOrder:false})
    }

    const classes = useStyles();
    const [visible,setVisible] = useState(true)
    return (
        <RestaurantBase>

            <h1 className={classes.heading}>Your Orders</h1>
            {orders.map(order => {
                console.log(order)
                return <OrderCard item={order}
                    handleYes={handleYes}
                    handleNo={handleNo}
                    visible={visible}
                    setVisible={setVisible}
                />
            })}
            {/* <Profile></Profile> */}
        </RestaurantBase>
    );
};