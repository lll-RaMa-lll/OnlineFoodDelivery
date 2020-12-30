var express = require("express");
var router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');

//Bringing controllers
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getRestaurantById, getCustomerById, getRestaurant, getAllRestaurants, updateRestaurant, getImage } = require("../controllers/restaurant");

router.param("restaurantId", getRestaurantById);

//Read routes
router.get("/restaurant/all", getAllRestaurants);
router.get("/restaurant/:restaurantId", getRestaurant);
router.get("/restaurant/image/:restaurantId", getImage);

//Update routes
router.put("/restaurant/:restaurantId", isSignedIn, isAuthenticated, updateRestaurant);

module.exports = router;