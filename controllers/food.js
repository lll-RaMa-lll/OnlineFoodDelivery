const Food = require("../models/food");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getFoodById = (req, res, next, id) => {
  Food.findById(id)
    .populate("restaurant", "_id name email")
    .exec((err, food) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.food = food;
      next();
    });
};

exports.createFood = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { name,price } = fields;

    if (!name || !price) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let obj = {...fields,restaurant:req.profile}

    let food = new Food(obj);

    //handle file here
    if (file.image) {
      if (file.image.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      food.image.data = fs.readFileSync(file.image.path);
      food.image.contentType = file.image.type;
    }
    // console.log(product);

    //save to the DB
    food.save((err, food) => {
      if (err) {
        console.log(err)
        res.status(400).json({
          error: "Saving food in DB failed"
          
        });
      }
      res.json(food);
    });
  });
};

exports.getFood = (req, res) => {
  req.food.image = undefined;
  return res.json(req.food);
};

//middleware
exports.getImage = (req, res, next) => {
  if (req.food.image.data) {
    res.set("Content-Type", req.food.image.contentType);
    return res.send(req.food.image.data);
  }else{
      res.status(400).send({
          error:"There is no image in DB"
      })
  }
  next();
};

// delete controllers
exports.deleteFood = (req, res) => {
  let food = req.food;
  let authorized = req.food.restaurant._id.toString()===req.profile._id.toString()
  if (!authorized){
      return res.status(403).json({
          error: "Not authorized to delete food"
      })
  }
  food.remove((err, deletedFood) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the food"
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedFood
    });
  });
};

// update controllers
exports.updateFood = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //updation code
    let food = req.food;
    let authorized = req.food.restaurant._id.toString()===req.profile._id.toString()
    console.log(req.food.restaurant._id)
    console.log(req.profile._id)
    // console.log(req.food.restaurant._id.toString()===req.profile._id.toString())
    if (!authorized){
        return res.status(403).json({
            error: "Not authorized to update food"
        })
    }
    food = _.extend(food, fields);

    //handle file here
    if (file.image) {
      if (file.image.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      food.image.data = fs.readFileSync(file.image.path);
      food.image.contentType = file.image.type;
    }
    // console.log(product);

    //save to the DB
    food.save((err, food) => {
      if (err) {
        res.status(400).json({
          error: "Updation of food failed"
        });
      }
      res.json(food);
    });
  });
};

//food listing

exports.getFoodListForARestaurant = (req, res) => {
    
    let limit = req.query && req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query && req.query.sortBy ? req.query.sortBy : "_id";

    Food.find({ restaurant: req.profile._id })
      .populate("restaurant", "_id name")
      .sort([[sortBy,"asc"]])
      .limit(limit)
      .exec((err, food) => {
        if (err) {
          return res.status(400).json({
            error: "No Foods are available in this account"
          });
        }
        return res.json(food);
      });
  };

