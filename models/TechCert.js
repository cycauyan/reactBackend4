const mongoose = require("mongoose");


const techCertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Certificate name is required"],
    }
});

module.exports = mongoose.model("TechCert", techCertSchema);