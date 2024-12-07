const bcrypt = require("bcrypt");
const { getUsersCollection } = require("../config/db.config");

// Centralized error messages for consistency
const ERROR_MESSAGES = {
  fetch: "Failed to fetch user",
  create: "Failed to create user",
  verify: "Failed to verify user password",
};

async function findUserByEmail(email) {
  try {
    const usersCollection = getUsersCollection();
    return await usersCollection.findOne({ email });
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    throw new Error(ERROR_MESSAGES.fetch);
  }
}

async function createUser({ firstName, lastName, email, phoneNumber, password }) {
  try {
    const usersCollection = getUsersCollection();
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error(ERROR_MESSAGES.create);
  }
}

async function verifyPassword(inputPassword, storedPassword) {
  try {
    return await bcrypt.compare(inputPassword, storedPassword);
  } catch (error) {
    console.error("Error in verifyPassword:", error);
    throw new Error(ERROR_MESSAGES.verify);
  }
}

module.exports = {
  findUserByEmail,
  createUser,
  verifyPassword,
};
