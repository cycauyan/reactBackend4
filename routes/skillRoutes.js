const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");


//endpoints
router.post(
    "/create",
    skillController.checkSkillExists,
    skillController.createSkill
);

router.get(
    "/",
    skillController.getAllSkill
);



router.put(
   '/update/:skillId',  skillController.updateSkill
)


module.exports = router;