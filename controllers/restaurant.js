require('dotenv').config();
const User_customer = require("../models/user_customer");
const User_restaurant = require('../models/user_restaurant');

exports.getRestaurantById = (req, res, next, id) => {
    User_restaurant.findById(id).exec((err, restaurant) => {
        if (err) {
            return res.status(400).json({
                error: "Restaurant not found in DB"
            });
        }
        req.profile = restaurant;
        next();
    });
};

exports.getRestaurant = (req, res) => {
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile._v = undefined;
    req.profile.encry_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
}

exports.getAllRestaurants = (req, res) => {
    User_restaurant.find({}, '_id name rating description isAcceptingOrder image', (err, restaurants) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to find any restaurant"
            });
        }
        res.json({ restaurants });
    })
}

exports.updateRestaurant = (req, res) => {
    const restaurant = req.profile;
    restaurant.name = req.body.name ? req.body.name : restaurant.name;
    restaurant.phone = req.body.phone ? req.body.phone : restaurant.phone;
    restaurant.address = req.body.address ? req.body.address : restaurant.address;
    restaurant.description = req.body.description ? req.body.description : restaurant.description;
    restaurant.isAcceptingOrder = req.body.isAcceptingOrder ? req.body.isAcceptingOrder : restaurant.isAcceptingOrder;

    // updatedRestaurant = new User_restaurant(restaurant);
    restaurant.save((err, updatedRestaurant) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: "Unable to update restaurant"
            });
        }
        res.json(updatedRestaurant);
    });
}
