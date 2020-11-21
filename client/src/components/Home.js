import React,{useState} from 'react'
import {Button} from '@material-ui/core'
import {Modal} from 'react-responsive-modal'
import "react-responsive-modal/styles.css";
import UserCustomerSignIn from './signin-forms/UserCustomerSignIn'


export default function Home(){
    const [openSignin,setOpenSignin] = useState(false)
    return(
        <div>
            <Button
                variant='contained' 
                color='secondary'
                onClick={()=>setOpenSignin(true)}       
             >Sign In</Button>
             <Modal open={openSignin} onClose={()=>setOpenSignin(false)}>
                <UserCustomerSignIn/>
            </Modal>
        </div>
    )
}