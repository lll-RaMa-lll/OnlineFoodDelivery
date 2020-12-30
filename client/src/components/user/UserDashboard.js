import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { socket } from '../../socket'
import { getRestaurants } from './helper/coreApiCalls'
import MediaCard from '../common/foodCard'
import { isAutheticated } from '../auth/helper'
import UserBase from './UserBase'

function UserDashboard({ history }) {
    let { user, token } = isAutheticated('customer')
    const [restaurantList, setRestaurantList] = useState([])

    useEffect(() => {

        getRestaurants()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    let restaurants = data
                    console.log(restaurants)
                    setRestaurantList(restaurants)
                }
            })

        socket.emit('customerConnection', { id: user._id, name: user.name }, (response) => {
            console.log(response)
        })


    }, [])

    return (
        <UserBase isSignedIn={true}>
            <Grid
                container>
                {
                    restaurantList.map(restaurant => {
                        let restaurantId = restaurant._id

                        return <MediaCard name={restaurant.name} image={restaurant.image} path={`/home/order/restaurants/${restaurantId}`} />

                    })
                }
            </Grid>
        </UserBase>
    )

}

export default UserDashboard