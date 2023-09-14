const Skill = require("../models/Skill");
const auth = require("../auth.js");


checkSkillExists = async (req, res, next) => {
    try {
        const skill = req.body.name;
        const existingSkill = await Skill.findOne({ name: skill });
        if (existingSkill) {
            return res.send(` "${skill}" already exists.`)
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while processing your request.');
    }
};



createSkill = async (req, res) => {
    try {
        const payload = auth.getPayload(req.headers.authorization);
        const { name } = req.body;
             if (payload.isAdmin){

                const newSkill = new Skill({
                    name: name,
                });
                if(name.trim()!==""){
                    await newSkill.save();
                    return res.status(200).json(`created skill ${name}`);
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

updateSkill = async (req,res)=>{
    try {
        const payload = auth.getPayload(req.headers.authorization);
        const skillId = req.params.skillId;
        let updatedSkill = {
            name:req.body.name
        }
        if(payload.isAdmin){
            let result = await Skill.findByIdAndUpdate(skillId, updatedSkill, {new:true});
            return res.status(200).json({message:"Updated successfully!", updated:result});
        }
        else{
            return res.status(403).json({error:"You do not have admin priveleges.", isAdmin:false})
        }
    } catch (error) {
        return res.status(400).send('An error occurred while processing your request.');
    }
}


getAllSkill = async (req,res)=>{
    try {
        const allSkill = await Skill.find();
        return res.status(200).json({skills:allSkill});
        
    } catch (error) {
        return res.status(400).send('An error occurred while processing your request.')
    }
}




module.exports = { checkSkillExists, createSkill, updateSkill, getAllSkill};