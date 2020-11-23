import React from 'react'
import { Button, makeStyles, createMuiTheme, Grid, Paper } from '@material-ui/core'
// import {UserRestaurantSignUp} from '../signup-forms/UserRestaurantSignUpForm'
import BackRestaurant from '../../assets/back-rest.jpg'
import Zomato from "../../assets/zomato.png"
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

const useStyles = makeStyles({
    root: {
        alignContent: "center"
    },
    topBar: {
        minHeight: "4em",
        backgroundColor: "#448844",
        padding: "1em",
        display: "flex"
    },
    toptext: {
        color: "#FFF"
    },
    back: {
        padding: '0px',
        margin: '0px',
        backgroundImage: 'url(' + BackRestaurant + ')',
        backgroundRepeat: "no-repeat",
        color: "#FFF",
        height: "100vh"
    },
    centerText: {
        textAlign: "center",
        paddingTop: "10em"
    },
    button: {
        backgroundColor: "#448844",
        margin: "1em",
    }
});

export default function RestaurantHome(props) {
    const classes = useStyles();
    return (
        <div className={classes.back}>
            <Paper className={classes.topBar}>
                <img src={Zomato} style={{ height: "4em" }}></img>
                <h1 className={classes.toptext}>Restaurantss</h1>
            </Paper>
            <h1 className={classes.centerText}>Serving good food to Customers with a Smile :)
            <br />
            Join us and expand your Business</h1>
            <br />
            <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: '10vh' }}
            >
                <Button
                    className={classes.button}
                    color='secondary'
                    variant='contained'
                    onClick={() => { props.history.push('/user-restaurant-signup') }}
                >Sign Up
                </Button>
                <Button
                    className={classes.button}
                    color='secondary'
                    variant='contained'
                >Sign In
                </Button>
            </Grid>
        </div>
    )
}