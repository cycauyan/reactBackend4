const mongoose = require("mongoose");



const businessUnitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "business unit name is required"],
    },
    positions: [{
        type:String,
        required: [true, "position name is required"],
    }]
});

module.exports = mongoose.model("BusinessUnit", businessUnitSchema);
