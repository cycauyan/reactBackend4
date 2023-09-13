const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    dateRegistered: {
        type: Date,
        immutable: true,
        default: new Date(),
    },
    name: {
        fname: {
            type:String,
            default:""
        },
        mname: {
            type:String,
            default:""
        },
        lname: {
            type:String,
            default:""
        }
    },
    nickName: {
        type:String,
        default:""
    },
    katakananame: {
        type:String,
        default:""
    }, 
    resume: {
        type:String,
        default:""
    }, 
    dateHired:{
        type: Date,
        required: [true, "date hired is required"]
    },
    contract:{
        price:{
            rate: {
                type:Number
            }, 
            ibmRate:{
                type:Number
            }, 
            ubicomRate:{
                type:Number
            } 
        },
        poUntil:{type:Date} 
    },
    actionBatch: {type:String}, 
    yearOfExperiencePreAWS: {type:Number},
    yearOfExperience: {type:Number}, 
    techCertification: [{name:{type:String}, link: {type:String}}],
    skills : [{
        industrySkill:[{type: mongoose.Schema.Types.ObjectId, ref: 'IndustrySkill'}],
        mainSkill: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}], 
        subSkill: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}],
        L1: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}],
        L2: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}],
        L3: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}],
        L4: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}],
        L5: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}],
        focusSkill: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}],
        }],
    nihongo: {type:String}, 
    companyProfile:{
        businessUnitOff: {type:String},
        businessUnitAss: {type:String}, 
        position: {type:String}
    }, 
    currentAssignment:{type:String},
    assignmentLocation: {type:String}, 
    candidateFor: {type:String}, 
    email: {type:String},
    location1: {type:String}, 
    location2: {type:String}, 
    contactNum: {type:String},
    passportExpiration: {type:Date},
    remarks: {type:String}
});

module.exports = mongoose.model("User", userSchema);
