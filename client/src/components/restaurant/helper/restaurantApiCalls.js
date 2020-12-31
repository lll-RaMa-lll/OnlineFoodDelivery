const API = process.env.REACT_APP_API_URL


export const updateRestaurant = (userId, token, payload) => {
    return fetch(`${API}/api/restaurant/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: payload
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  