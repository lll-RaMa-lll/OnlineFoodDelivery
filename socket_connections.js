

const customers = []
const restaurants = []
const valets = []



const addUser = ({name,...rest},socket,userType)=>{
    let users = ''
    if(userType === 'customer') users=customers
    if(userType === 'restaurant') users = restaurants
    if(userType === 'valet') users = valets

    if(!name) return {error:'userName is required'}

    const existingUser = users.find(user=>user.name===name)
    if (existingUser) return {error:'user is already present'}

    const user = {name,...rest,socket:socket}

    console.log(`number of ${userType}s are: `)
    console.log(users.push(user))

}



const removeUser = (id) => {

    console.log('customers are:')
    console.log(customers.length)
    console.log('restaurants are:')
    console.log(restaurants.length)
    console.log('valets are :')
    console.log(valets.length)

    let index = customers.findIndex((user) => user.socket.id === id);
    if(index !== -1) return customers.splice(index, 1)[0];
    else{
        index = valets.findIndex((user) => user.socket.id === id)
        if(index !== -1) return valets.splice(index, 1)[0];
        else{
            index = restaurants.findIndex((user) => user.socket.id === id)
            if(index !== -1) return restaurants.splice(index, 1)[0];
        }
        
    }
    

}

const getUser = (name,userType) => {
    let users = ''
    if(userType === 'customer') users=customers
    if(userType === 'restaurant') users = restaurants
    if(userType === 'valet') users = valets

    console.log(userType)
    console.log(users.length)
    
    return users.find((user) => user.name === name)

};

const getAllUsers = (userType)=>{
    let users = ''
    if(userType === 'customer') users=customers
    if(userType === 'restaurant') users = restaurants
    if(userType === 'valet') users = valets

    return users
}

// const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser ,getAllUsers};