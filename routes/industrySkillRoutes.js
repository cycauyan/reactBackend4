const express = require("express");
const router = express.Router();
const industrySkillController = require("../controllers/industrySkillController");


//endpoints
router.post(
    "/create",
    industrySkillController.checkIndustrySkillExists,
    industrySkillController.createIndustrySkill
);

router.get(
    "/",
    industrySkillController.getAllIndustrySkill
);



router.put(
   '/update/:industrySkillId',  industrySkillController.updateIndustrySkill
)


module.exports = router;