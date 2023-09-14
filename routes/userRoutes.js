const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers.js");

//endpoints
router.post(
    "/register",
    userController.checkEmailExists,
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

router.get(
    "/filter",
    userController.getFilteredUser
);

router.put(
   '/updateuser/:userId',  userController.updateUser
)


module.exports = router;