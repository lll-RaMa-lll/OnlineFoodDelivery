# OnlineFoodDelivery

---

A realtime online food delivery service built with nodejs, expressjs, socketio, mongodb in the backend and reactjs in the frontend.

# Status

---

This project is still under development.

# Some key Features:

---

- Three types of users are there:
  - Customers,
  - Restaurants,
  - Valets
- Customers can view different restaurants and dishes.
- Customers can place an order, cancel an already placed order.
- Whenever a customer places an order restaurants will be updated in realtime. They can either accept the order or reject it.
- If restaurants accept orders then all the valets located inside a threshold radius will get notified realtime.
- If one of the valets accepts the order then all the other valets will be notified that the order has already been accepted.
- The customer will get realtime update about the delivery status.

# Screenshots:

---

# Installation and setup instructions:

---

First clone down this repository. You will need node and npm globally installed on your machine. Also to run server you need nodemon installed globaly on your machine.

To run the server go to the cloned directory and type the following command.

```
$ npm install & npm start
```

this will let the server up and running.

To run the client go to the client directory and type the following command.

```
$ npm install & npm start
```

now go to your favorite browser and on the search bar type

```
locahost:3000
```

this will take you to the customer deafult page.
Similarly for restaurant page type

```
localhost:3000/restaurant
```

and for valet page type

```
localhost:3000/valet
```

# Limitations:

---

- We are not using real location data here. Instead we are using a
  grid with predefined dummy data to calculate distance between two locations. We are generating hash from location strings and based on that hash we are calculating distance between two locations.
