import React ,{useState} from 'react'
import { Button, makeStyles, createMuiTheme, Grid, Paper } from '@material-ui/core'
import { MoodSharp } from '@material-ui/icons';
import BackRestaurant from '../../assets/back-restaurant.jpg'
import Zomato from "../../assets/zomato.png"
import UserValetSignIn from '../signin-forms/UserValetSignin'
import { Modal } from 'react-responsive-modal'

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
        backgroundColor: "#884488",
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
        color: "#FFF",
        height: "100vh"
    },
    centerText: {
        textAlign: "center",
        paddingTop: "10em"
    },
    button: {
        backgroundColor: "#884488",
        margin: "1em",
    }
});

export default function ValetHome(props) {
    const classes = useStyles();
    const [openSignin, setOpenSignin] = useState(false)
    return (
        <div className={classes.back}>
            <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
                <UserValetSignIn/>
            </Modal>
            <Paper className={classes.topBar}>
                <img src={Zomato} style={{ height: "4em" }}></img>
                <h1 className={classes.toptext}>Valets</h1>
            </Paper>
            <h1 className={classes.centerText}>Delivering good food to Customers with a Smile :)
            <br />
            Join us and start earning</h1>
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
                    onClick={() => { props.history.push('/user-valet-signup') }}
                >Sign Up
                </Button>
                <Button
                    className={classes.button}
                    color='secondary'
                    variant='contained'
                    onClick={() => setOpenSignin(true)}
                >Sign In
                </Button>
            </Grid>
        </div>
    )
}