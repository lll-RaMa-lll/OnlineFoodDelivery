const API = process.env.REACT_APP_API_URL


//get list of all the restaurants

export const getRestaurants = ()=>{
    return fetch(`${API}/api/restaurant/all` ,{
        method:"GET"
    }).then(response=> response.json())
        .catch(err=>console.log(err))

}

//get image for a particular restaurant
export const getImageForAFood = (foodId)=>{
    return fetch(`${API}/api/food/image/${foodId}`,{
        method:"GET"
    })
}


//get all foods for a particular restaurant
export const getFoods = (userId) => {
    return fetch(`${API}/api/food/restaurant/${userId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };