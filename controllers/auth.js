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
        user = new User_restaurant(req.body);
    }
    else if (req.body.userType == "valet") {
        req.body.userType = undefined;
        user = new User_valet(req.body);
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

exports.signin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        });

    const {
        email,
        password
    } = req.body;

    if (req.body.userType == "customer")
        var User = User_customer;
    else if (req.body.userType == "restaurant")
        var User = User_restaurant;
    else if (req.body.userType == "valet")
        var User = User_valet;

    User.findOne({
        email
    }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Error processing request"
            });
        }

        if (!user) {
            return res.status(400).json({
                error: "Email id is not yet registerd"
            });
        }

        if (!user.autheticate(password)) {
            return res.status(401).json({
                error: "Wrong email id or password"
            });
        }

        //create token
        const token = jwt.sign({
            _id: user._id
        }, process.env.SECRET);
        //save cookies 
        res.cookie("token", token, {
            expire: new Date() + 604800 // expires after 7 days
        });

        //send response to frontend
        const {
            _id,
            name,
            email
        } = user;
        return res.json({
            token,
            user: {
                _id,
                name,
                email
            }
        });
    });
};

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "Acccess Denied"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (!req.profile.admin) {
        return res.status(403).json({
            error: "Admin access not granted"
        })
    }
    next();
}