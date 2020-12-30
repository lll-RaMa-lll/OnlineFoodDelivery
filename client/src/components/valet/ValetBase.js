import React, { useState } from 'react'
import { Button, Paper, createMuiTheme, ThemeProvider, Grid } from '@material-ui/core'
import { Home, AccountCircle, Fastfood, PowerSettingsNew, Height } from '@material-ui/icons';
import { styled, makeStyles } from '@material-ui/core/styles';
import { Modal } from 'react-responsive-modal'
import zomato from "../../assets/zomato.png";
import background from "../../assets/background1.jpg";
import UserCustomerSignIn from "../signin-forms/UserCustomerSignIn"
import {signout} from '../auth/helper'
import {withRouter} from 'react-router-dom'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#884488",
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
        zIndex: "1",
        display: "flex",
        color: "#FFF"
    },
    icon: {
        color: "#FFF",
        position: "relative",
        left: "0.5em"
    },
    navbar: {
        background: "#884488",
        padding: "1em 1em",
        position: "fixed",
        top: "6em",
        width: "100%",
        zIndex: "2"
    },
    button: {
        background: "#884488",
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
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

function ValetBase(props) {
    const classes = useStyles();
    let isSignedIn = props.isSignedIn ? props.isSignedIn : false
    const [openSignin, setOpenSignin] = useState(false)

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Paper
                    className={classes.topbar}
                    square="true">
                    <img src={zomato} height="60vh" position="relative" left="20vw"></img>
                    <h1>Valets</h1>
                </Paper>
                <Paper
                    className={classes.navbar}
                    elevation={8}
                    square="true">
                    <div>
                        <Button
                            hidden={true}
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
                            Past Orders
                            <Fastfood className={classes.icon}></Fastfood>
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={() => {
                                signout('valet', () => {
                                    props.history.push('/valet')
                                })  
                            }}
                            >
                            Logout
                            <PowerSettingsNew className={classes.icon}></PowerSettingsNew>
                        </Button>
                    </div>
                </Paper>
                <Paper
                    className={classes.blank}>
                    <Paper
                        className={classes.contentArea}>
                        {props.children}
                    </Paper>
                </Paper>
            </ThemeProvider>
        </div >
    )

}

export default withRouter(ValetBase)