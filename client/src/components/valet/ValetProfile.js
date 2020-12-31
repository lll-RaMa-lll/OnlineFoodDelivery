import React ,{useState,useEffect} from 'react'
import {socket} from '../../socket'
import { isAutheticated } from '../auth/helper'
import { Modal } from 'react-responsive-modal'
import { CenterFocusStrong } from '@material-ui/icons'
import ValetAcceptOrder from './ValetAcceptOrder'
import ValetBase from './ValetBase'
import OrderCard from '../common/orderCard'
import Profile from '../common/profile'








export default function ValetProfile(){


    let {user,token} = isAutheticated('valet')

    return(
        <ValetBase>
            <h1>Profile</h1>
            <Profile userType='valet'
                userId={user._id}
                token={token}
            />
        </ValetBase>
    )
}


