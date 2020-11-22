const express = require("express");
const router = express.Router();

const {
  getFoodById,
  createFood,
  getFood,
  getImage,
  updateFood,
  deleteFood,
  getFoodListForARestaurant
} = require("../controllers/food");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getRestaurantById } = require("../controllers/restaurant");

//all of params
router.param("userId", getRestaurantById);
router.param("foodId", getFoodById);

//all of actual routes
//create route
router.post(
  "/food/create/:userId",
  isSignedIn,
  isAuthenticated,
  createFood
);

// read routes
router.get("/food/:foodId", getFood);
router.get("/food/image/:foodId", getImage);

//delete route
router.delete(
  "/food/:foodId/:userId",
  isSignedIn,
  isAuthenticated,
  deleteFood
);

//update route
router.put(
  "/food/:foodId/:userId",
  isSignedIn,
  isAuthenticated,
  updateFood
);

//listing route
router.get("/food/restaurant/:userId",getFoodListForARestaurant)


module.exports = router;
