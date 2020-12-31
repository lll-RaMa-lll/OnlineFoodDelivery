import React ,{useState,useEffect} from 'react'
import {socket} from '../../socket'
import { isAutheticated } from '../auth/helper'
import { Modal } from 'react-responsive-modal'
import { CenterFocusStrong } from '@material-ui/icons'
import ValetAcceptOrder from './ValetAcceptOrder'
import ValetBase from './ValetBase'
// import Profile from '../common/profile'
import OrderCard from '../common/orderCard'







export default function ValetDashboard(){

    const [name,setName] = useState('')
    let {user,token} = isAutheticated('valet')
    const [orders,setOrders] = useState([])
    const [message,setMessage] = useState('')

    // const [openModal,setOpenModal] = useState(false)


    useEffect(()=>{
        
        // socket.emit('valetConnection',{name:'someValet'},(response)=>{
        //     console.log(response)
        // })


        socket.emit('valetConnection',{id:user._id,name:user.name},(response)=>{
            console.log(response)
        })
        socket.on('orderForValet',(data)=>{

            console.log(data)
            setOrders([...orders,data])
            // setOpenModal(true)

            // let answer= prompt('would you accept the order?')
            // let hasAcceptedOrder = false
            // if(answer==='yes') hasAcceptedOrder = true
            // console.log(name,answer)
            // socket.emit('responseToServerRegardingOrderFromValet',{hasAcceptedOrder:true,name})
        

        })

        socket.on('messageToValetsRegardingAcceptanceOfOrder',(data)=>{
            console.log(data)
            setMessage(data.msg)
        })



    },[])

    const [visible,setVisible]=useState(true)
    const handleYes=()=>{
        setVisible(false)
        socket.emit('responseToServerRegardingOrderFromValet',{hasAcceptedOrder:true,name:user.name})
    }

    const handleNo=()=>{
        setVisible(false)
        socket.emit('responseToServerRegardingOrderFromValet',{hasAcceptedOrder:false,name:user.name})
    }

    return(
        <ValetBase>
            {/* <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <ValetAcceptOrder/>
            </Modal> */}
            <h1>valet Dashboard</h1>
            {orders.map(order => {
                console.log(order)
                return <OrderCard item={order}
                    handleYes={handleYes}
                    handleNo={handleNo}
                    visible={visible}
                    setVisible={setVisible}
                 />
            })}
            <h1>{message}</h1>  
            {/* <Profile></Profile> */}
        </ValetBase>
    )
}


