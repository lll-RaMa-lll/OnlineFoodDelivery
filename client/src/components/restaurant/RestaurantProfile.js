import React, { Component, useEffect, useState } from "react";
import { styled, makeStyles } from '@material-ui/core/styles';
import OrderCard from "../common/orderCard";
// import Profile from "../common/profile";
import { socket } from '../../socket'
import { isAutheticated, signout } from '../auth/helper'
import RestaurantBase from './RestaurantBase'
import Profile from '../common/profile'

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: "center",
        color: "#FFF",
        borderBottom: "1px solid #FFF"
    }
}));
export default function RestaurantProfile({ history }) {

    let { user, token } = isAutheticated('restaurant')

    const classes = useStyles();
    return (
        <RestaurantBase>

            <h1 className={classes.heading}>Profile</h1>
            <Profile userType='restaurant'
             userId={user._id} 
             token={token}
             />
        </RestaurantBase>
    );
};