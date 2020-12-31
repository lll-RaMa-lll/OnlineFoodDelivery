const API = process.env.REACT_APP_API_URL


export const updateCustomer = (userId, token, payload) => {
    return fetch(`${API}/api/customer/${userId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  