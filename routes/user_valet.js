const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser
} = require("../controllers/user_valet");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/valet/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/valet/:userId", isSignedIn, isAuthenticated, updateUser);



module.exports = router;
