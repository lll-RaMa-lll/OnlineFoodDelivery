var express = require("express");
var router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');

//Bringing controllers
const { signup } = require("../controllers/auth");

//Setting routes
router.post("/signup", [
    check('name').isLength({ min: 3 }).withMessage("Name should be atleast 3 letter long"),
    check('email').isEmail().withMessage("Invalid email id"),
    check('phone').isLength({ min: 10, max: 10 }).withMessage("Phone number should be 10 digits long"),
    check('password').isLength({ min: 8 }).withMessage("Password should be of atleast 8 characters")
        .matches(/\d/).withMessage("Password must contain atleast 1 Digit")
        .matches(/[A-Z]/).withMessage("Password must contain atleast 1 Uppercase Letter")
        .matches(/[a-z]/).withMessage("Password must contain atleast 1 Lowercase Letter")
], signup);

//Exporting routes
module.exports = router;