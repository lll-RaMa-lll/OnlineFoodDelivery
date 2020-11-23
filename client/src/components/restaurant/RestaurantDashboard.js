import React, { Component ,useState,useEffect} from "react";
import { styled, makeStyles } from '@material-ui/core/styles';
import { Paper, GridList, Button, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Home, AccountCircle, Fastfood, PowerSettingsNew, Height } from '@material-ui/icons';
import zomato from "../../assets/zomato.png";
import background from "../../assets/background1.jpg";
import { size } from "lodash";

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
        padding: "1em 10em"
    },
    icon: {
        color: "#FFF",
        position: "relative",
        left: "0.5em"
    },
    navbar: {
        background: "#FF5544",
        padding: "1em 1em"
    },
    button: {
        background: "#FF5544",
        height: "2em",
        width: "10vw",
        color: "#FFF",
    },
    blank: {
        padding: "1em 10em",
        backgroundImage: `url(${background})`,

    },
    contentArea: {
        background: "#333",
        padding: "1em",
        minHeight: "30em",
        borderRadius: "2em"
    },
    heading: {
        textAlign: "center",
        color: "#FFF",
        borderBottom: "1px solid #FFF"
    }
}));

export default function RestaurantDashboard() {
    const classes = useStyles();


    return (
    <div>
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
                    className={classes.button}>
                    Dishes
                    <Fastfood className={classes.icon}></Fastfood>
                </Button>
                <Button
                    className={classes.button}>
                    Logout
                    <PowerSettingsNew className={classes.icon}></PowerSettingsNew>
                </Button>
            </Paper>
            <Paper
                className={classes.blank}>
                <Paper
                    className={classes.contentArea}>
                    <h1 className={classes.heading}>Your Orders</h1>
                </Paper>
            </Paper>
        </ThemeProvider>
    </div>
    );
};