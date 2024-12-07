const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const { body } = require("express-validator");

const router = express.Router();

// Validation rules for user registration
const registerValidationRules = [
  body("firstName").isString().notEmpty().withMessage("First Name is required"),
  body("lastName").isString().notEmpty().withMessage("Last Name is required"),
  body("phoneNumber").notEmpty().withMessage("Phone Number is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation rules for user login
const loginValidationRules = [
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// route
router.post("/register", registerValidationRules, registerUser);
router.post("/login", loginValidationRules, loginUser);

module.exports = router;
