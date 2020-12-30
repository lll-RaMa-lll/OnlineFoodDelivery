const API = process.env.REACT_APP_API_URL

//Food calls

//create a Food
export const createFood = (userId, token, food) => {
  return fetch(`${API}/api/food/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: food
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

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

//delete a food

export const deleteFood = (foodId, userId, token) => {
  return fetch(`${API}/api/food/${foodId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//get a food

export const getFood = foodId => {
  return fetch(`${API}/api/food/${foodId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//update a Food

export const updateFood = (foodId, userId, token, food) => {
  return fetch(`${API}/api/food/${foodId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: food
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
