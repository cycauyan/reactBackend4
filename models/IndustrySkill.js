const mongoose = require("mongoose");


const industrySkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "skill name is required"],
    }
});

module.exports = mongoose.model("IndustrySkill", industrySkillSchema);