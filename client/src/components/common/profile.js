import React, { useState} from 'react';
import { TextField, createMuiTheme, ThemeProvider, Grid, Divider } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { AddAPhoto } from '@material-ui/icons';
import Food from '../../assets/default_food.jpg';
import { arrayBufferToBase64 } from '../common/helper/imageConversion'
import {Button} from '@material-ui/core'
import {updateRestaurant} from '../restaurant/helper/restaurantApiCalls'
import {updateValet} from '../valet/herper/valetApiCalls'
import {updateCustomer} from '../user/helper/customerApiCalls'
import {withRouter} from 'react-router-dom'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#F54',
        },
        secondary: {
            main: '#FA4',
        },
        text: {
            primary: '#AAA',
            secondary: '#888',
            disabled: '888',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1em',
        padding: '0em 1em',
        width: '90%',
        minHeight: '8em',
        backgroundColor: '#444',
        color: '#FFF',
        borderRadius: '1em'
    },
    text: {
        margin: '1em',
        width: '80%'
    },
    photo: {
        height: "40%",
        width: "40%",
        padding: "5%",
        objectFit: "cover",
        borderRadius: "100%"
    },
    uploadPic: {
        position: "relative",
        top: "-4em",
        left: "7em"
    },
    addIcon: {
        border: "4px solid #FFF",
        borderRadius: "100%",
        padding: "2%",
        backgroundColor: "#444",
        position: "relative",
        top: "-1em",
        left: "3em"
    },
    earnings: {
        fontSize: "2em",
        color: "#FEA"
    }
}));

function Profile(props) {
    let name = props.name ? props.name : "Name";
    let email = props.mail ? props.mail : "mail@email.com";
    let phone = props.phone ? props.phone : "1234567890";
    let photo = props.image ? props.image : Food;
    let address = props.address ? props.address : "Address";
    let details = props.details ? props.details : "Details";
    let totalIncome = props.totalIncome ? props.totalIncome : "10,000";
    let rating = props.rating ? props.rating : 3.4;
    const classes = useStyles();


    let {userType,userId,token,history} = props

    const [valuesCustomer,setValuesCustomer] = useState({
        name:"",
        email:"",
        phone:"",
        error:"",
        address:""

    })

    const [valuesValet,setValuesValet] = useState({
        name:"",
        email:"",
        phone:"",
        error:"",
        details:""

    })

    const [valuesRestaurant,setValuesRestaurant] = useState({
        formData: new FormData(),
        error: "",
        name:"",
        email:"",
        phone:"",
        address:"",
        details:""

    })


    const handleChange = name => event => {

        const value = name === "image" ? event.target.files[0] : event.target.value;

        switch(userType){
            case "restaurant" :

                valuesRestaurant.formData.set(name, value);
                setValuesRestaurant({ ...valuesRestaurant, [name]: value });
                break
            
            case "customer" :
                // let value = event.target.value
                setValuesCustomer({...valuesCustomer,[name]:value })
                break

            case "valet" :
                // let value = event.target.value
                setValuesValet({...valuesValet, [name]: value })
                break
        }
    };

    const submitHandler = (event)=>{
        event.preventDefault()
        if(userType==='restaurant'){
            updateRestaurant(userId,token,valuesRestaurant.formData)
                .then(data=>{
                    if(data.error){
                        console.log(data.error)
                        setValuesRestaurant({...valuesRestaurant, error:data.error})
                    }else{
                        console.log(data);
                        history.push('/restaurant/profile')
                    }
                })

        }else if(userType==='customer'){
            let {name,
                phone,
                error,
                address}=valuesCustomer
            let payload = {name,phone,address}
            updateCustomer(userId,token,payload)
                .then(data=>{
                    if(data.error){
                        setValuesCustomer({...valuesCustomer, error:data.error})
                        console.log(data.error)
                    }else{
                        console.log(data);
                        history.push('/profile')
                    }
                })

        }else if(userType==='valet'){
            let {name,
                email,
                phone,
                error,
                details}= valuesValet
            }
            let payload = {name:valuesValet.name,phone:valuesValet.phone,details:valuesValet.details}
            updateValet(userId,token,payload)
                .then(data=>{
                    if(data.error){
                        setValuesValet({...valuesValet, error:data.error})
                        console.log(data.error)
                    }else{

                        console.log(data);
                        history.push('/valet/profile')
                    }
                })

        }
        








    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2} xs={12}>
                <Grid item xs={6}>
                    <div className={classes.root}>
                        <br />
                        <TextField
                            onChange={handleChange("name")}
                            className={classes.text}
                            id="Name"
                            label="Name"
                            defaultValue={name}
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            onChange={handleChange("email")}
                            className={classes.text}
                            id="Email"
                            label="Email"
                            defaultValue={email}
                            variant="outlined"
                            disabled
                        />
                        <br />
                        <TextField
                            onChange={handleChange("phone")}
                            className={classes.text}
                            id="Phone"
                            label="Phone"
                            defaultValue={phone}
                            variant="outlined"
                        />
                        <br />
                        <br />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    {props.userType == 'restaurant' &&
                        <div className={classes.root} style={{ backgroundColor: '#0000' }}>
                            {props.image == undefined &&
                                <img src={photo} className={classes.photo}></img>
                            }
                            {props.image != undefined &&
                                <img src={`data:${photo.contentType};base64,${arrayBufferToBase64(photo.data.data)}`} className={classes.photo}></img>
                            }
                            <div className={classes.uploadPic}>
                                <AddAPhoto className={classes.addIcon} />
                                {/* <b>Change Photo</b> */}
                                <Button
                                    variant="contained"
                                    component="label"
                                    >
                                    Change Photo
                                    <input
                                        type="file"
                                        onChange={handleChange("image")}
                                        hidden
                                    />
                                </Button>
                            </div>
                        </div>
                    }
                </Grid>
            </Grid>
            {props.userType != 'valet' &&
                <div className={classes.root}>
                    <br />
                    <TextField
                        onChange={handleChange("address")}
                        className={classes.text}
                        id="Address"
                        label="Address"
                        multiline
                        rows={4}
                        defaultValue={address}
                        variant="outlined"
                    />
                    <br />
                </div>
            }
            {(props.userType == 'restaurant' || props.userType == 'valet') &&
                <div className={classes.root}>
                    <br />
                    <Grid container xs={12}>
                        <Grid item xs={6}>
                            <TextField
                                onChange={handleChange("details")}
                                className={classes.text}
                                id="Details"
                                label="Details"
                                multiline
                                rows={4}
                                defaultValue={details}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <h3 style={{ textAlign: "center", borderRight: "2px solid #FFF" }}>
                                Customer rating
                            <br />
                                <a style={{ fontSize: "2em" }}>
                                    {rating}
                                </a>
                                <br />
                                <Rating readOnly value={rating} precision={0.1} />
                            </h3>
                        </Grid>
                        <Divider />
                        <Grid item xs={3}>
                            <h3 style={{ textAlign: "center" }}>
                                Total Earning
                            <br />
                                <br />
                                <a className={classes.earnings}>₹ {totalIncome}</a>
                            </h3>
                        </Grid>
                    </Grid>
                </div>
            }
        <span style={{display:"flex",justifyContent:"center"}}>
            <Button 
                color='primary'
                variant='contained'
                onClick={submitHandler}
            >
                Update Profile
            </Button>
        </span>
        </ThemeProvider>
    );
}




export default withRouter(Profile)