const express = require("express");
const router = express.Router();
const techCertController = require("../controllers/techCertController");


//endpoints
router.post(
    "/create",
    techCertController.checkCertExists,
    techCertController.createCert
);

router.get(
    "/",
    techCertController.getAllCert
);



router.put(
   '/update/:certId',  techCertController.updateCert
)


module.exports = router;