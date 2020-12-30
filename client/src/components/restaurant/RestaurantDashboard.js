import React, { Component,useEffect,useState } from "react";
import { styled, makeStyles } from '@material-ui/core/styles';
import { Paper, GridList, Button, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Home, AccountCircle, Fastfood, PowerSettingsNew, Height } from '@material-ui/icons';
import zomato from "../../assets/zomato.png";
import background from "../../assets/background1.jpg";
import { size, stubFalse } from "lodash";
import MenuItem from "../common/menuItem";
import OrderCard from "../common/orderCard";
import Profile from "../common/profile";
import {socket} from '../../socket'
import { Modal } from 'react-responsive-modal'
import AddFood from './AddFood'
import {isAutheticated, signout} from '../auth/helper'

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
    topbar: {
        background: "#202020",
        padding: "1em 10em",
        position: "fixed",
        top: '0',
        width: "100%",
        zIndex: "1"
    },
    icon: {
        color: "#FFF",
        position: "relative",
        left: "0.5em"
    },
    navbar: {
        background: "#FF5544",
        padding: "1em 1em",
        position: "fixed",
        top: "6em",
        width: "100%",
        zIndex: "2"
    },
    button: {
        background: "#FF5544",
        height: "2em",
        width: "10vw",
        color: "#FFF",
    },
    blank: {
        padding: "1em 10%",
        backgroundImage: `url(${background})`,
        position: "relative",
        top: "9.5em",
        zIndex: "0"
    },
    contentArea: {
        background: "#333",
        padding: "1em",
        minHeight: "40em",
        borderRadius: "2em",
    },
    heading: {
        textAlign: "center",
        color: "#FFF",
        borderBottom: "1px solid #FFF"
    }
}));

export default function RestaurantDashboard({history}) {

    let {user,token} = isAutheticated('restaurant')

    useEffect(()=>{
        socket.emit('restaurantConnection',{id:user._id,name:user.name},(response)=>{
            console.log(response)
        })

        socket.on('orderForRestaurant',(data)=>{
            // let isAcceptingOrder = prompt('will you accept this order')
            console.log(data)
            setOrders([...orders,data])
            // let answer= prompt('would you accept the order?')
            // console.log('answer:',answer)
            // let isAcceptingOrder = false
            // if(answer==='yes') isAcceptingOrder = true
            

        })

        socket.on('responseToRestaurantRegardingValetInformation',(data)=>{
            console.log(data)
        })


    },[])
    
    const [openDishes, setOpenDishes] = useState(false)
    const [orders, setOrders] = useState([])

    const classes = useStyles();
    return (<div>
        <Modal open={openDishes} onClose={() => setOpenDishes(false)}>
                <AddFood/>
        </Modal>
        <ThemeProvider theme={theme}>
            <Paper
                className={classes.topbar}
                square="true">
                <img src={zomato} height="60vh" position="relative" left="20vw"></img>
            </Paper>
            <Paper
                className={classes.navbar}
                elevation={8}
                square="true">
                <Button
                    className={classes.button}>
                    Home
                    <Home className={classes.icon}></Home>
                </Button>
                <Button
                    className={classes.button}>
                    Profile
                    <AccountCircle className={classes.icon}></AccountCircle>
                </Button>
                <Button
                    className={classes.button} onClick = {()=>setOpenDishes(true)}>
                    Dishes
                    <Fastfood className={classes.icon}></Fastfood>
                </Button>
                <Button
                    className={classes.button}
                    onClick={()=>{
                        signout('restaurant',()=>{
                            history.push('/restaurant')
                        })
                    }}
                    >
                    Logout
                    <PowerSettingsNew className={classes.icon}></PowerSettingsNew>
                </Button>
            </Paper>
            <Paper
                className={classes.blank}>
                <Paper
                    className={classes.contentArea}>
                    <h1 className={classes.heading}>Your Orders</h1>
                    {orders.map(order=>{
                        return <OrderCard item={order} />
                    })}
                    <Profile></Profile>
                </Paper>
            </Paper>
        </ThemeProvider>
    </div >
    );
};