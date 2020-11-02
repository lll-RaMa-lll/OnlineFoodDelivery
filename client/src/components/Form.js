

import React,{Component} from 'react'
import {ThemeProvider,createMuiTheme} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Image from '../assets/pexels-pixabay-461198.jpg'
import Paper from '@material-ui/core/Paper'


import SaveIcon from '@material-ui/icons/Save'
import MenuIcon from '@material-ui/icons/Menu';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { orange } from '@material-ui/core/colors'
import { green } from '@material-ui/core/colors'





const styles = {
    paperContainer: {
        backgroundImage: `url(${Image})`,
        backgroundRepeat: `no-repeat`,
        height: 700,
        backgroundSize:  `cover`
    },
    textCenter:{
        display:'flex',
        justifyContent:'center'
    }
};

const theme=createMuiTheme({
    palette:{
        primary:{
            main: green[500]
        }
    }

})







class Form extends Component{

    constructor(){
        super()
        this.state={
            email: '',
            username:'',
            phone: '',
            password: '',
            reEnteredPassword: '',
            errorMessage:''

        }


        this.changeHandler=this.changeHandler.bind(this)
        this.submitHandler=this.submitHandler.bind(this)
    }
    changeHandler= event=>{
        let nam= event.target.name
        let val=event.target.value

        this.setState({[nam]:val})
    }

 

    submitHandler= event=>{
        event.preventDefault()
        // console.log('submitting!')
        const {email,username,phone,password,reEnteredPassword}=this.state

        // console.log(password,reEnteredPassword)
        if(password!==reEnteredPassword){
            this.setState({
                errorMessage:'Your passwords are not matching'
            })
            return
        }

        let submit=async () => {
            let obj={userType:'customer',name:username,email,phone,password}
            const {REACT_APP_API_URL}=process.env
            
            const rawResponse = await fetch(`${REACT_APP_API_URL}/api/signup`, {
              method: 'POST',
              headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(obj)

            });
            console.log(JSON.stringify(obj))
            const content = await rawResponse.json();
            if('error' in content){
                this.setState({
                    errorMessage:content.error
                })
            }
            else{
                this.props.history.push('/success')
            }
            
            console.log(content)


        }

        submit()

        


    }



    render(){
        let {errorMessage}=this.state
        return (
            <ThemeProvider theme={theme}>
                <Paper style={styles.paperContainer}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <FastfoodIcon />
                            </IconButton>
                            <Typography variant="h6">
                                Your online food delivery service
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <br/>
                    <span style={styles.textCenter}>       
                        <p style={{color:'#fc0303'}}>{errorMessage}</p>
                    </span>
                    <br/>
                    <span style={styles.textCenter}>
                        <TextField
                            type='email'
                            variant='filled'
                            label='Email'
                            name='email'
                            onChange={this.changeHandler}
                        
                        />
                    </span>
                    <br/>
                    <span style={styles.textCenter}>
                        <TextField
                            type='text'
                            name='username'
                            variant='filled'
                            label='Name'
                            onChange={this.changeHandler}
                        
                        />
                    </span>
                    <br/>
                    <span style={styles.textCenter}>
                        <TextField
                            type='phone'
                            name='phone'
                            label='Phone'
                            onChange={this.changeHandler}
                            variant='filled'
                        
                        />
                    </span>
                    <br/>
                    <span style={styles.textCenter}>
                        <TextField
                            type='password'
                            name='password'
                            variant='filled'
                            onChange={this.changeHandler}
                            label='Password'
                        
                        />
                    </span>
                    <br/>
                    <span style={styles.textCenter}>
                        <TextField
                            type='password'
                            name='reEnteredPassword'
                            variant='filled'
                            onChange={this.changeHandler}
                            label='Re Enter Password'
                        
                        />
                    </span>
                    <br/>
                    <span style={styles.textCenter}>       
                        <Button
                            color='primary'
                            startIcon={<SaveIcon/>}
                            variant='contained'
                            onClick={this.submitHandler}
                        >
                            sing up
                        </Button>
                    </span>
                    



                </Paper>

            </ThemeProvider>
        )
    }


    


}

export {Form}