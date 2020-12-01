import React , {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/back-restaurant.jpg'
import { green,purple } from '@material-ui/core/colors'
import {ThemeProvider,createMuiTheme} from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import {signin,authenticate} from '../auth/helper'
import {withRouter} from 'react-router-dom'



const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500]
        }
    }

})


const useStyles = makeStyles((theme) => ({
  root: {

  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  palette:{
    primary: green[500]
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage:{
      color:'red'
  }
}));

function UserValetSignIn({history}) {
  const classes = useStyles();
  const [user,setUser]=useState({
      email:'',
      password:'',
      isRemembered:false,
      errorMessage:''

})

    let handleChange=(e)=>{
        let {name,value,type,checked}=e.target
        type=='checkbox'?setUser({
            ...user,
            [name]:checked
        }):
        setUser({
            ...user,
            [name]:value
        })
    }
    
    let handleSubmit= (e)=>{
        e.preventDefault()
        let {email,password,isRemembered,errorMessage}=user

        signin({userType:'valet',email,password})
          .then(data=>{
              if(data.error){
                setUser({
                  ...user,
                  errorMessage:data.error
                })
              }else{
                if(user.isRemembered){
                  authenticate(data,()=>{
                    console.log('successfully saved data on the local storage')
              
                  })
                }
                console.log(data)
                history.push('valet/home')
              }
          })
          .catch(err=>console.log(err))

    }

  return (
    <ThemeProvider theme={theme}>
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} noValidate>
                <Typography
                    className={classes.errorMessage}
                >{user.errorMessage}
                </Typography>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                />
                <FormControlLabel
                control={<Checkbox name='isRemembered' value="remember" color="primary" checked={user.isRemembered}/>}
                label="Remember me"
                onChange={handleChange}
                />
                <Button
                type="submit"
                fullWidth
                startIcon={<SaveIcon />}
                variant="contained"
                color='primary'
                className={classes.submit}
                onClick={handleSubmit}
                >
                Sign In
                </Button>
            </form>
            </div>
        </Grid>
        </Grid>
    </ThemeProvider>
  );
}


export default withRouter(UserValetSignIn)