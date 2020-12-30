import React, { useState, useEffect } from 'react'
import { socket } from '../../socket'
import { useParams } from 'react-router-dom'
import { getFoods, getImageForAFood } from './helper/coreApiCalls'
import FoodCard from '../common/foodCard'
import MenuItem from '../common/menuItem'
import { isAutheticated } from '../auth/helper'
import { Button } from '@material-ui/core'
import { loadCart } from '../common/helper/carthelper'
import UserBase from './UserBase'
import { styled, makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    lowerBar: {
        background: "#202020",
        padding: "1em 1em",
        position: "fixed",
        bottom: "0em",
        width: "100%",
        maxHeight: "3em",
        color: "#FFF",
        display: "flex",
        justifyContent: "space-around"
    },
    button: {
        backgroundColor:"grey"
    }
}));

export default function OrderPage(){

    const { user, token } = isAutheticated('customer');
    const classes = useStyles();
    const [params, setParams] = useState(useParams())
    const [foodList, setFoodList] = useState([])
    // const [images,setImages] = useState({})

    useEffect(()=>{
        // socket.emit('orderPlaced',{customerName:'someone',restaurantName:'someRestaurant'})
        
        // socket.on('responseToUser',(data)=>{
        //     console.log(data)
        // })

        // socket.on('errorMessage',(err)=>{
        //     console.log(err)
        // })

        getFoods(params.restaurantId)
        .then(data=>{
            setFoodList(data)
        })
        // foodList.forEach(food=>{
        //     getImageForAFood(food._id).then(data=>{
        //         setImages({
        //             ...images,
        //             [food._id]:data
        //         })
        //     })
        // })
        
    },[])

    console.log('foods',foodList)
    // console.log('images',images)
    return(
        <div>
            <UserBase isSignedIn={false}>

                {foodList.map(food => {
                    return <MenuItem item={{ restaurant: params.restaurantId,food,disabled:true}}
                        image={food.image}
                        name={food.name}
                        price={food.price}
                        description={food.description} />
                })}
            </UserBase>
            <div className={classes.lowerBar}>
                <b>Total amount : 0</b>
                <Button className={classes.button}
                    variant='outlined'
                    color='secondary'
                    disabled={true}
                >
                    Place Order
                </Button>
            </div>
        </div>
    )
}