const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser
} = require("../controllers/user_customer");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user_customer/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user_customer/:userId", isSignedIn, isAuthenticated, updateUser);



module.exports = router;
