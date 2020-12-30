import React,{useState,useEffect} from 'react'
import {socket} from '../../socket'
import {useParams} from 'react-router-dom'
import {getFoods,getImageForAFood} from './helper/coreApiCalls'
import FoodCard from '../common/foodCard'
import MenuItem from '../common/menuItem'
import { isAutheticated } from '../auth/helper'
import {Button} from '@material-ui/core'
import {loadCart } from '../common/helper/carthelper'


export default function OrderPageAuthenticated({history}){

    const { user, token } = isAutheticated('customer');
    const [params, setParams] = useState(useParams())
    const [foodList, setFoodList] = useState([])
    // const [images,setImages] = useState({})

    useEffect(()=>{
        
       

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

    const clickHandler = ()=>{
        console.log('clicked')
        history.push('/home/order/process')
    }

    console.log('foods',foodList)
    // console.log('images',images)
    return(
        <div>
            <h1>Order Page Authenticated</h1>
            {foodList.map(food=>{
                return <MenuItem item={ { restaurant:params.restaurantId, customer:user._id, food } }
                image={food.image} 
                name={food.name} 
                price={food.price}
                description={food.description} />
            })}
            <Button
                variant='outlined'
                color='secondary'
                onClick={clickHandler}
            >
                Place Order
            </Button>
        </div>
        
    )
}