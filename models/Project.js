const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema({
    client: {
        type: String,
        required: [true, "client is required"],
    },
    name: {
        type: String,
        required: [true, "project name is required"]
    },
    location:[{
        type:String,
        required: [true, "location is required"]
    }]
});

module.exports = mongoose.model("Project", projectSchema);

