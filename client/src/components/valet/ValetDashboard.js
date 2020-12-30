import React ,{useState,useEffect} from 'react'
import {socket} from '../../socket'
import { isAutheticated } from '../auth/helper'
import { Modal } from 'react-responsive-modal'
import { CenterFocusStrong } from '@material-ui/icons'
import ValetAcceptOrder from './ValetAcceptOrder'







export default function ValetDashboard(){

    const [name,setName] = useState('')
    let {user,token} = isAutheticated('valet')

    const [openModal,setOpenModal] = useState(false)


    useEffect(()=>{
        
        // socket.emit('valetConnection',{name:'someValet'},(response)=>{
        //     console.log(response)
        // })


        socket.emit('valetConnection',{id:user._id,name:user.name},(response)=>{
            console.log(response)
        })
        socket.on('orderForValet',(data)=>{

            console.log(data)
            let {name,isAcceptingOrder}= data
            setName(name)
            console.log(name)
            setOpenModal(true)

            // let answer= prompt('would you accept the order?')
            // let hasAcceptedOrder = false
            // if(answer==='yes') hasAcceptedOrder = true
            // console.log(name,answer)
            // socket.emit('responseToServerRegardingOrderFromValet',{hasAcceptedOrder:true,name})
        

        })

        socket.on('messageToValetsRegardingAcceptanceOfOrder',(data)=>{
            console.log(data)
        })



    },[])

    return(
        <div>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <ValetAcceptOrder/>
            </Modal>
            <h1>valet Dashboard</h1>
        </div>
    )
}


