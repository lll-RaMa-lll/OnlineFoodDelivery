require('dotenv').config();
const User_customer = require("../models/user_customer");
const User_restaurant = require("../models/user_restaurant");
const User_valet = require("../models/user_valet")
const {
    check,
    validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

//Functions for authentication routes

exports.signup = (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        });
    let user;
    if (req.body.userType == "customer") {
        req.body.userType = undefined;
        user = new User_customer(req.body);
    }
    else if (req.body.userType == "restaurant") {
        req.body.userType = undefined;
        user = new User_restaurant(req.body)
        ;
    }
    else if (req.body.userType == "valet") {
        req.body.userType = undefined;
        user = new User_valet(req.body);
        ;
    }
    else {
        res.status(422).json({
            error: "User type is absent or not valid",
            param: "userType"
        })
    }
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to save user data in the Database"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            id: user._id
        });
    });
};