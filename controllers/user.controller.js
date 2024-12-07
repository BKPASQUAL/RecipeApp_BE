const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

// Centralized response messages
const RESPONSE_MESSAGES = {
  userExists: "User already exists",
  registerSuccess: "User registered successfully",
  registerFail: "Server error during registration",
  userNotFound: "User not found",
  invalidPassword: "Invalid password",
  loginSuccess: "Login successful",
  loginFail: "Server error during login",
};

async function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    const userExists = await userService.findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: RESPONSE_MESSAGES.userExists });
    }

    await userService.createUser({ firstName, lastName, email, phoneNumber, password });
    return res.status(201).json({ message: RESPONSE_MESSAGES.registerSuccess });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: RESPONSE_MESSAGES.registerFail });
  }
}

async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: RESPONSE_MESSAGES.userNotFound });
    }

    // Verify password
    const isPasswordValid = await userService.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: RESPONSE_MESSAGES.invalidPassword });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, firstName: user.firstName },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    return res.status(200).json({ message: RESPONSE_MESSAGES.loginSuccess, token });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: RESPONSE_MESSAGES.loginFail });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
