require('dotenv').config();
const User_customer = require("../models/user_customer");
const User_restaurant = require('../models/user_restaurant');
const _ = require("lodash");
const formidable = require('formidable')
const fs = require('fs')

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
    User_restaurant.find({}, (err, restaurants) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to find any restaurant"
            });
        }
        res.json(restaurants);
    })
}


exports.getImage = (req, res) => {
  if (req.profile.image.data) {
    res.set("Content-Type", req.profile.image.contentType);
    return res.send(req.profile.image.data);
  }else{
      res.status(400).send({
          error:"There is no image in DB"
      })
  }
};



exports.updateRestaurant = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
  
      //updation code
      let restaurant = req.profile;
      restaurant = _.extend(restaurant, fields);
  
      //handle file here
      if (file.image) {
        if (file.image.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        restaurant.image.data = fs.readFileSync(file.image.path);
        restaurant.image.contentType = file.image.type;
      }
      // console.log(product);
  
      //save to the DB
      restaurant.save((err, restaurant) => {
        if (err) {
          res.status(400).json({
            error: "Updation of restaurant data failed"
          });
        }
        res.json(restaurant);
      });
    });
  };
