import React ,{useState,useEffect} from 'react'
import {socket} from '../../socket'



export default function ValetDashboard(){

    const [name,setName] = useState('')

    

    const clickHandler = (event)=>{
        event.preventDefault()
        socket.emit('valetConnection',{name},(response)=>{
            console.log(response)
        })


    }

    useEffect(()=>{
        
        // socket.emit('valetConnection',{name:'someValet'},(response)=>{
        //     console.log(response)
        // })

        socket.on('orderForValet',(data)=>{

            console.log(data)
            let {name,isAcceptingOrder}= data

            // let answer= prompt('would you accept the order?')
            // let hasAcceptedOrder = false
            // if(answer==='yes') hasAcceptedOrder = true
            // console.log(name,answer)
            socket.emit('responseToServerRegardingOrderFromValet',{hasAcceptedOrder:true,name})
        

        })

        socket.on('messageToValetsRegardingAcceptanceOfOrder',(data)=>{
            console.log(data)
        })



    },[])

    return(
        <div>
            <h1>valet Dashboard</h1>
            <input onChange={(e)=>setName(e.target.value)}></input>
            <button onClick={(event)=>clickHandler(event)}>Submit</button>
            <h1>{name}</h1>
        </div>
    )
}