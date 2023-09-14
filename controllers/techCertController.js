const TechCert = require("../models/TechCert");
const auth = require("../auth.js");

//This controller affects only the system's settings tech cert name, not the tech certification link that the employee can provide
checkCertExists = async (req, res, next) => {
    try {
        const certExists = req.body.name;
        const existingCert = await TechCert.findOne({ name: certExists });
        if (existingCert) {
            return res.send(` "${certExists}" already exists.`)
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while processing your request.');
    }
};


createCert = async (req, res) => {
    try {
        const payload = auth.getPayload(req.headers.authorization);
        const { name } = req.body;
             if (payload.isAdmin){
                const newCert = new TechCert({
                    name: name,
                });
                if(name.trim()!==""){
                    await newCert.save();
                    return res.status(200).json(`created Certificate ${name}`);
                }
                else{
                    return res.json({message: "Invalid input"});
                }
            }
            else{
                return res.status(403).json({error:"You do not have admin priveleges."});
            }  //end 
        } catch (error) {
            console.log(error);
            return res.status(500).send('An error occurred while processing your request.');
        }
    };

updateCert = async (req,res)=>{
    try {
        const payload = auth.getPayload(req.headers.authorization);
        const certId = req.params.certId;
        let updatedCert = {
            name:req.body.name
        }
        if(payload.isAdmin){
            let result = await TechCert.findByIdAndUpdate(certId, updatedCert, {new:true});
            return res.status(200).json({message:"Updated successfully!", updated:result});
        }
        else{
            return res.status(403).json({error:"You do not have admin priveleges.", isAdmin:false})
        }
    } catch (error) {
        return res.status(400).send('An error occurred while processing your request.');
    }
}


getAllCert = async (req,res)=>{
    try {
        const allCert = await TechCert.find();
        return res.status(200).json({techCert:allCert, count:allCert.length});
        
    } catch (error) {
        return res.status(400).send('An error occurred while processing your request.')
    }
}




module.exports = { checkCertExists, createCert, updateCert, getAllCert};