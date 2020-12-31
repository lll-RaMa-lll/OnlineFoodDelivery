import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { socket } from '../../socket'
import { getRestaurants } from './helper/coreApiCalls'
import MediaCard from '../common/foodCard'
import { isAutheticated } from '../auth/helper'
import UserBase from './UserBase'
import Profile from '../common/profile'

function UserProfile() {
    let { user, token } = isAutheticated('customer')
    return (
        <UserBase isSignedIn={true}>
            <h1>Profile</h1>
            <Profile userType='customer'
            userId={user._id}
            token={token} />
        </UserBase>
    )

}

export default UserProfile