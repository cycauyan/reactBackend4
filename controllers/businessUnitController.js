const BusinessUnit = require("../models/BusinessUnit");

const auth = require("../auth.js");


checkBusinessUnitExists = async (req, res, next) => {
    try {
        const buName = req.body.name;
        const existingBU = await BusinessUnit.findOne({ name: buName });

        if (existingBU) {
            return res.send(` "${buName}" already exists.`)
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while processing your request.');
    }
};



createBU = async (req, res) => {
    try {
        const payload = auth.getPayload(req.headers.authorization);
        const { name, positions } = req.body;
             if (payload.isAdmin){
                const newBusinessUnit = new BusinessUnit({
                    name: name,
                    positions: positions
                });
                console.log(name);
                console.log(positions);
                //This requires the user to add at least one position in order to create a Business unit
                if(name.trim()!=="" && positions.length>0){
                    await newBusinessUnit.save();
                    return res.status(200).send(`created Business Unit`);
                }
                else{
                    return res.json({message: "Please fill in required fields"});
                }
            }
            else{
                return res.status(403).json({error:"You do not have admin priveleges."})
            }  //end of inner else
        } catch (error) {
            console.log(error);
            return res.status(500).send('An error occurred while processing your request.');
        }
    };

updateBU = async (req,res)=>{
    try {
        const payload = auth.getPayload(req.headers.authorization);
        const buId = req.params.buId;

        let updatedBU = {
            name:req.body.name,
            positions:req.body.positions
        }
        if(payload.isAdmin){
            let result = await BusinessUnit.findByIdAndUpdate(buId, updatedBU, {new:true});
            return res.status(200).json({message:"Updated successfully!", businessunit:result})
        }
        else{
            return res.status(403).json({error:"You do not have admin priveleges.", isAdmin:false})
        }        
    } catch (error) {
        return res.status(400).send('An error occurred while processing your request.')
    }
}


getAllBU = async (req,res)=>{
    try {
        const allBU = await BusinessUnit.find();
        return res.status(200).json({businessunits:allBU});
        
    } catch (error) {
        return res.status(400).send('An error occurred while processing your request.')
    }
}




module.exports = { checkBusinessUnitExists, createBU, updateBU, getAllBU};