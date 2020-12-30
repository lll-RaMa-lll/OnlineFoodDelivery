import React, { useState } from 'react'
import { Button, Paper, createMuiTheme, ThemeProvider, Grid } from '@material-ui/core'
import { Home, AccountCircle, Fastfood, PowerSettingsNew, Height } from '@material-ui/icons';
import { styled, makeStyles } from '@material-ui/core/styles';
import { Modal } from 'react-responsive-modal'
import zomato from "../../assets/zomato.png";
import background from "../../assets/background1.jpg";
import UserCustomerSignIn from "../../components/signin-forms/UserCustomerSignIn"
import {signout} from '../auth/helper'
import { withRouter } from 'react-router-dom'

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

function UserBase(props) {
    const classes = useStyles();
    let isSignedIn = props.isSignedIn ? props.isSignedIn : false
    const [openSignin, setOpenSignin] = useState(false)
    console.log(props.history)
    return (
        <div>
            <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
                <UserCustomerSignIn />
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
                    {isSignedIn == true &&
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
                                    signout('customer', () => {
                                        props.history.push('/')
                                    })
                                }}>
                                Logout
                            <PowerSettingsNew className={classes.icon}></PowerSettingsNew>
                            </Button>
                        </div>
                    }
                    {isSignedIn == false &&
                        <div>
                            <Button
                                className={classes.button}
                                onClick={() => setOpenSignin(true)}
                            >Sign In
                        </Button>
                            <Button
                                className={classes.button}
                                onClick={() => props.history.push("/user-customer-signup")}
                            >Sign Up
                        </Button>
                        </div>
                    }
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

export default withRouter(UserBase);