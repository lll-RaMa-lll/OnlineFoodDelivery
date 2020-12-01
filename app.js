require('dotenv').config();
const mongoose = require("mongoose");
const http = require('http')
const express = require("express");
const socketio = require('socket.io')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoute = require("./routes/auth");
const restaurantRoute = require("./routes/restaurant");
const customerRoute = require("./routes/user_customer");
const valetRoute = require("./routes/user_valet");
const foodRoutes = require("./routes/food");



const { addUser, removeUser, getUser ,getAllUsers} = require('./socket_connections')


//DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED...");
})
    .catch(() => {
        console.log("In catch SECTION");
    });

const app = express();
const server = http.createServer(app)
const io = socketio(server)

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoute);
app.use("/api", restaurantRoute);
app.use("/api", customerRoute);
app.use("/api", valetRoute);
app.use("/api",foodRoutes);



io.on('connect',(socket)=>{

    console.log('connected')
    socket.on('customerConnection',(msg,callback)=>{
        console.log(msg)
        addUser(msg,socket,'customer')
        callback('user successfully connected')
    })

    socket.on('restaurantConnection',(msg,callback)=>{
        console.log(msg)
        addUser(msg,socket,'restaurant')
        callback('restaurant successfully connected')
    })

    socket.on('valetConnection',(msg,callback)=>{
        console.log(msg)
        addUser(msg,socket,'valet')
        socket.join('valet')
        callback('valet successfully connected')
    })

    socket.on('orderPlaced',(data)=>{
        console.log(data)
        socket.emit('responseToUser',{message:'order is saved.waiting for restaurant update'})

        const {userName,restaurantName} = data
        const restaurant = getUser(restaurantName,'restaurant')
        
        if(!restaurant) {socket.emit('errorMessage',{error:'restaurant is not online right now'})}
        else{
            socketRestaurant=restaurant.socket

            socketRestaurant.emit('orderForRestaurant',data)

            socketRestaurant.on('responseToServerRegardingOrderFromRestaurant', (data)=>{
                console.log(data)
                if(data.isAcceptingOrder){
        
                    socket.emit('responseToUser',{message:'restaurant has accepted the order'})
        
                    // io.to('valet').emit('orderForVallet',data)
                    // console.log('list of clients')
                    // console.log(io.sockets.clients().sockets)
                    let valetList=getAllUsers('valet')

                    for(let valet of valetList){
                        valetSocket=valet.socket
                        valetSocket.emit('orderForValet',{name:valet.name,isAcceptingOrder:data.isAcceptingOrder})
                    }

                    let valetAcceptingOrder = ''
                    let counter=0

                    // console.log(valetList)
                    for(let valet of valetList){

                        valetSocket=valet.socket
                        valetSocket.on('responseToServerRegardingOrderFromValet',(data)=>{
                            counter+=1
                            console.log(data)
                            if(data.hasAcceptedOrder){
                                if(!valetAcceptingOrder){ 
                                    
                                    valetAcceptingOrder=valet
                                    socket.emit('responseToUser',{message:`valet named ${data.name} has accepted the order`})
                                    socketRestaurant.emit('responseToRestaurantRegardingValetInformation',{msg:`valet named ${data.name} has accepted the order`})

                                    for (let newValet of valetList){
                                        if(newValet!==valet){
                                            newValet.socket.emit('messageToValetsRegardingAcceptanceOfOrder',{msg:`valet named ${data.name} has accepted the order`})
                                        }
    
                                    }

                                    valetAcceptingOrder.socket.emit('messageToValetsRegardingAcceptanceOfOrder',{msg:`user is notified!`})
                                
                                }

                                
                            }else{
                                if(counter===valetList.length && !valetAcceptingOrder){
                                    socket.emit('responseToUser',{message:'no valets available'})
                                }
                            }

                        })
                        if(valetAcceptingOrder){
                            break
                        }
                    }
                


                }else{
                    socket.emit('responseToUser',{message:'restaurant has rejected the order'})
                }   
            })
        }
    })


                 



    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user) console.log(`${user.name} left`)
    })

})














//Starting server
const port = process.env.SERVERPORT;
server.listen(port, () => {
    console.log(`app is running on port ${port}`);
});