const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers.js");


router.post(
    "/register",
    userController.checkEmailExists,
    userController.checkUsernameExists,
    userController.registerUser
);

router.post(
    "/login",
    userController.loginUser
);

router.get(
    "/getUserDetails",
    userController.getUserDetails
);

module.exports = router;