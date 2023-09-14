const express = require("express");
const router = express.Router();
const businessUnitController = require("../controllers/businessUnitController.js");

//endpoints
router.get(
    "/", businessUnitController.getAllBU
);

router.post(
    "/create",
    businessUnitController.checkBusinessUnitExists,
    businessUnitController.createBU
);

router.put(
    "/update/:buId",businessUnitController.updateBU
)




module.exports = router;