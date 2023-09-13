const mongoose = require("mongoose");


const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "skill name is required"],
    }
});

module.exports = mongoose.model("Skill", skillSchema);