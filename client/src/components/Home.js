import React, { useState ,useEffect} from 'react'
import UserCustomerSignIn from './signin-forms/UserCustomerSignIn'
import "react-responsive-modal/styles.css";
import { Modal } from 'react-responsive-modal'
import { Button, Paper, createMuiTheme, ThemeProvider,Grid } from '@material-ui/core'
import { Home, AccountCircle, Fastfood, PowerSettingsNew, Height } from '@material-ui/icons';
import { styled, makeStyles } from '@material-ui/core/styles';
import zomato from "../assets/zomato.png";
import background from "../assets/background1.jpg";
import MediaCard from './common/foodCard'



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
        minHeight: "50em",
        borderRadius: "2em"
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

export default function Homepage(props) {
    const classes = useStyles();
    const [openSignin, setOpenSignin] = useState(false)
    const [restaurantList,setRestaurantList] = useState({restaurants:[]})

    useEffect(() => {
        let fetchMovies = async ()=>{
            let api_url =`${process.env.REACT_APP_API_URL}/api/restaurant/all`
            let response = await fetch(api_url)
            console.log(response)
            let data= await response.json()
            console.log(data.restaurants)
            console.log('yo')
            setRestaurantList(pre=>({
                ...pre,
                restaurants:data.restaurants.map(v=><MediaCard name={v.name}/>
                )
            }))
            console.log(restaurantList.restaurants)
        }
        fetchMovies()
        
    }, [])


    return (
        <div>
            <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
                <UserCustomerSignIn />
            </Modal>
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
                        {/* <Button
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
                            className={classes.button}>
                            Logout
                            <PowerSettingsNew className={classes.icon}></PowerSettingsNew>
                        </Button> */}
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
                    </Paper>
                    <Paper
                        className={classes.blank}>
                        <Paper
                            className={classes.contentArea}>
                            <h1 className={classes.heading}>Order online</h1>
                            {/* <Grid container className={classes.root} spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container justify="center" spacing={spacing}>
                                    {[0, 1, 2].map((value) => (
                                        <Grid key={value} item>
                                        <Paper className={classes.paper} />
                                        </Grid>
                                    ))}
                                    </Grid>
                                </Grid>
                            </Grid> */}
                            {
                                restaurantList.restaurants
                            }
                        </Paper>
                    </Paper>
                </ThemeProvider>
            </div>
        </div>
    )
}