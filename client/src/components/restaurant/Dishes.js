import React, { useState, useEffect } from 'react'
import "react-responsive-modal/styles.css";
import { Button, Paper, createMuiTheme, ThemeProvider, Grid } from '@material-ui/core'
import MediaCard from '../common/foodCard'
import { getFoods, getRestaurants } from '../user/helper/coreApiCalls'
import RestaurantBase from './RestaurantBase';
import { authenticate, isAutheticated } from '../auth/helper';
import { Add } from '@material-ui/icons';
import AddFood from './AddFood'
import { Modal } from 'react-responsive-modal'


export default function Dishes(props) {
    const [foodList, setFoodList] = useState([])
    const [openDishes, setOpenDishes] = useState(false)
    useEffect(() => {
        getFoods(isAutheticated('restaurant').user._id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    let foods = data
                    console.log(foods)
                    setFoodList(foods)
                }
            })

    }, [])

    return (
        <RestaurantBase isSignedIn={true}>
            <Modal open={openDishes} onClose={() => setOpenDishes(false)}>
                <AddFood />
            </Modal>
            {console.log(foodList)}
            <Grid
                container>
                {
                    foodList.map(food => {
                        return <MediaCard type='food' color={"#448844"} name={food.name} image={food.image} />
                    })
                }
                <Button style={{ width: '8em', height: '10em', background: '#FFF5', margin: '3em 2em' }}
                    onClick={() => setOpenDishes(true)}>
                    <Add style={{ color: '#FFF', fontSize: '5em', padding: '0.5em 0.3em' }}></Add>
                </Button>
            </Grid>
        </RestaurantBase>
    )
}