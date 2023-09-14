const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

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
        type: Date
    },
    contract:{
            rate: {
                type:Number,
                default:0
            }, 
            ibmRate:{
                type:Number,
                default:0
            }, 
            ubicomRate:{
                type:Number,
                default:0
            },
            poUntil:{type:Date} 
    },
    actionBatch: {type:String}, 
    yearOfExperiencePreAWS: {type:Number},
    yearOfExperience: {type:Number}, 
    techCertification: [{name:{type:String}, link: {type:String}}],
    skills : {
        industrySkill:[{type:String}], //[{type: mongoose.Schema.Types.ObjectId, ref: 'IndustrySkill'}]
        mainSkill: [{type:String}], //[{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}]
        subSkill: [{type:String}],
        lv1: [{type:String}],
        lv2: [{type:String}],
        lv3: [{type:String}],
        lv4: [{type:String}],
        lv5: [{type:String}],
        focusSkill: [{type:String}]
        },
    nihongo: {type:String}, 
    companyProfile:{
        businessUnitOff: {type:String},
        businessUnitAss: {type:String}, 
        position: {type:String}
    }, 
    currentAssignment:{type:String},
    assignmentLocation: {type:String}, 
    candidateFor: {type:String}, 
    location1: {type:String}, 
    location2: {type:String}, 
    contactNum: {type:String},
    passportExpiration: {type:Date},
    remarks: {type:String}
});

module.exports = mongoose.model("User", userSchema);
