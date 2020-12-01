const API = process.env.REACT_APP_API_URL

export const signup = user => {
  return fetch(`${API}/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
  return fetch(`${API}/api/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    let jwt = `${data.user.userType}_jwt`
    localStorage.setItem(jwt, JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/api/signout`, {
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
};

export const isAutheticated = (userType) => {
  if (typeof window == "undefined") {
    return false;
  }
  let jwt= `${userType}_jwt`
  if (localStorage.getItem(jwt)) {
    return JSON.parse(localStorage.getItem(jwt));
  } else {
    return false;
  }
};
