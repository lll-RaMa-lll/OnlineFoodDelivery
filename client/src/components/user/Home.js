import React, { useState, useEffect } from 'react'
import "react-responsive-modal/styles.css";
import { Button, Paper, createMuiTheme, ThemeProvider, Grid } from '@material-ui/core'
import MediaCard from '../common/foodCard'
import { getRestaurants } from './helper/coreApiCalls'
import UserBase from './UserBase';

export default function Homepage(props) {
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

    }, [])

    return (
        <UserBase>
            <Grid
                container>
                {
                    restaurantList.map(restaurant => {
                        let restaurantId = restaurant._id

                        return <MediaCard name={restaurant.name} image={restaurant.image} path={`/restaurants/${restaurantId}`} />

                    })
                }
            </Grid>
        </UserBase>
    )
}