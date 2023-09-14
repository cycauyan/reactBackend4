const IndustrySkill = require("../models/IndustrySkill");
const auth = require("../auth.js");


checkIndustrySkillExists = async (req, res, next) => {
    try {
        const industrySkill = req.body.name;
        const existingIndustrySkill = await IndustrySkill.findOne({ name: industrySkill });
        if (existingIndustrySkill) {
            return res.send(` "${existingIndustrySkill}" already exists.`)
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while processing your request.');
    }
};

createIndustrySkill = async (req, res) => {
    try {
        const payload = auth.getPayload(req.headers.authorization);
        const { name } = req.body;
             if (payload.isAdmin){
                const newIndustrySkill = new Skill({
                    name: name,
                });
                if(name.trim()!==""){
                    await newIndustrySkill.save();
                    return res.status(200).json(`created Industry Skill ${name}`);
                }
                else{
                    return res.json({message: "Invalid input"});
                }
            }
            else{
                return res.status(403).json({error:"You do not have admin priveleges."})
            }  //end 
        } catch (error) {
            console.log(error);
            return res.status(500).send('An error occurred while processing your request.');
        }
    };

updateIndustrySkill = async (req,res)=>{
    try {
        const payload = auth.getPayload(req.headers.authorization);
        const industrySkillId = req.params.industrySkillId;
        let updatedIndustrySkill = {
            name:req.body.name
        }
        if(payload.isAdmin){
            let result = await Skill.findByIdAndUpdate(industrySkillId, updatedIndustrySkill, {new:true});
            return res.status(200).json({message:"Updated successfully!", updated:result});
        }
        else{
            return res.status(403).json({error:"You do not have admin priveleges.", isAdmin:false})
        }
    } catch (error) {
        return res.status(400).send('An error occurred while processing your request.');
    }
}


getAllIndustrySkill = async (req,res)=>{
    try {
        const allSkill = await Skill.find();
        return res.status(200).json({skills:allSkill});        
    } catch (error) {
        return res.status(400).send('An error occurred while processing your request.')
    }
}




module.exports = { checkSkillExists, createSkill, updateSkill, getAllSkill};