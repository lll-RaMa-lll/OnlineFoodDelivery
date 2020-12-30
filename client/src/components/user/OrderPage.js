import React,{useState,useEffect} from 'react'
import {socket} from '../../socket'
import {useParams} from 'react-router-dom'
import {getFoods,getImageForAFood} from './helper/coreApiCalls'
import FoodCard from '../common/foodCard'
import MenuItem from '../common/menuItem'
import { isAutheticated } from '../auth/helper'


export default function OrderPage(){

    const { user, token } = isAutheticated('customer');
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
            <h1>Order Page</h1>
            {foodList.map(food=>{
                return <MenuItem item={ { restaurant:params.restaurantId, customer:user._id, food , disabled:true} }
                image={food.image} 
                name={food.name} 
                price={food.price}
                description={food.description} />
            })}
        </div>
    )
}