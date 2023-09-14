const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");

registerUser = async (req, res) => {
    try {
        const { email, password, fname, mname, lname } = req.body;
        const newUser = new User({

            email: email,
            password: bcrypt.hashSync(password, 10),
            name: {
                fname: fname,
                mname: mname,
                lname: lname
            }
        });
        console.log(email);
        await newUser.save();

        return res.status(200).send(newUser);

    } catch (error) {
        console.error(error);
        return res.status(500).send(false)
    }
};




checkEmailExists = async (req, res, next) => {
    try {
        const email = req.body.email;
        const existingEmail = await User.findOne({ email: email });

        if (existingEmail) {
            
            return res.send({
                emailExists: true
            });

        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send(false)
    }
};


loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            res.send({
                userNotFound: true
            })
        } else {
            const isPasswordCorrect = bcrypt.compareSync(
                password, existingUser.password
            )
            if (isPasswordCorrect) {
                let token = auth.createAccessToken(existingUser);
                res.send({
                    accessToken: token
                });
            } else {
                res.send({
                    incorrectPassword: true
                });
            }
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while processing your request.');
    }
};


getUserDetails = async (req, res) => {
    try {
        const payload = auth.getPayload(req.headers.authorization);
        console.log(payload);
        const userData = await User.findById(payload.id);

        userData.password = "******";
        res.send(userData);
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while processing your request.');
    }
}


getAllUserDetails = async (req, res) => {
    try {
        // const payload = auth.getPayload(req.headers.authorization);
        // console.log(payload);
        const userData = await User.find();

        userData.password = "******";
        res.send(userData);
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while processing your request.');
    }
}


getFilteredUser = async (req,res)=>{

    try {
        let filter = {};
        Object.assign(filter, req.body);
        console.log(filter);//needs test 
        let data = await User.find(filter).sort({email:1}) //, { username: 1, email: 1, password: 1, isAdmin : 1, dateRegistered: 1}
            if(data.length < 1){
                return res.status(200).json({message:'No user(s) found.', count:data.length})
            }
            return res.status(200).json({message:`Search complete:`,count:data.length, users: data });         
        }

   catch (err) {
        console.log(err);
        return res.status(400).json({error:err});
    }

}


updateUser = async (req,res) =>{
    
    try{

    const payload = auth.getPayload(req.headers.authorization);
    const userId = req.params.userId;
    console.log(payload);
    console.log(userId);

    let updatedUser = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
    dateRegistered: req.body.dateRegistered,
    name: {
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname
    },
    nickName: req.body.nickName,
    katakananame: req.body.katakanaName, 
    resume: req.body.resumeLink, 
    dateHired:req.body.dateHired,
    contract:{
            rate: req.body.rate,
            ibmRate:req.body.ibmRate,
            ubicomRate:req.body.ubicomRate,
            poUntil:req.body.poUntil
    },
    actionBatch: req.body.actionBatch, 
    yearOfExperiencePreAWS: req.body.yearOfExperiencePreAWS,
    yearOfExperience: req.body.yearOfExperience, 
    techCertification: req.body.techCertification, //[{name:{type:String}, link: {type:String}}],
    skills : {
        industrySkill:req.body.industrySkill, //array of String
        mainSkill: req.body.mainSkill, 
        subSkill: req.body.subSkill,
        lv1: req.body.lv1,
        lv2: req.body.lv2,
        lv3: req.body.lv3,
        lv4: req.body.lv4,
        lv5: req.body.lv5,
        focusSkill: req.body.focusSkill
        },
    nihongo: req.body.nihongo, 
    companyProfile:{
        businessUnitOff: req.body.businessUnitOff,
        businessUnitAss: req.body.businessUnitAss, 
        position: req.body.position
    }, 
    currentAssignment:req.body.currentAssignment,
    assignmentLocation: req.body.assignmentLocation,
    candidateFor: req.body.candidateFor, 
    location1:   req.body.location1, 
    location2: req.body.location2,
    contactNum: req.body.contactNum,
    passportExpiration: req.body.passportExpiration,
    remarks: req.body.remarks
    }
        if (payload.isAdmin){
            let result = await User.findByIdAndUpdate(userId, updatedUser, {new:true})
                return res.status(200).json({message:"Updated successfully!", user:result})
        }
        else{
            //modify this code or add if else to return details editable by user
            return res.status(403).json({error:"You do not have admin priveleges.", isAdmin:false})
        }
    }
    catch(error){
        console.log(error);
        return res.json({error:error});
    }
}




// checkUsernameExists,

module.exports = { registerUser, checkEmailExists,  loginUser,getAllUserDetails, getUserDetails, getFilteredUser, updateUser};

