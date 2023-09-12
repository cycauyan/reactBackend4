const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");

registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 10)

        });

        await newUser.save();
        return res.status(200).send(`New user registered`);

    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while processing your request.');
    }
};

checkEmailExists = async (req, res, next) => {
    try {
        const email = req.body.email;
        const existingEmail = await User.findOne({ email: email });

        if (existingEmail) {
            const emailStr = email;
            return res.send(`Email "${emailStr}" is already registered.`)

        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while processing your request.');
    }
};

checkUsernameExists = async (req, res, next) => {
    try {
        const username = req.body.username;
        const existingUsername = await User.findOne({ username: username });

        if (existingUsername) {
            const nameStr = username;
            return res.send(`Username "${nameStr}" is already registered.`)

        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while processing your request.');
    }
};


loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ email: email }, { username: username }] });

        if (!existingUser) {
            res.send(`User not found. Register first!`);
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
                res.send(`Incorrect password`);
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


module.exports = { registerUser, checkEmailExists, checkUsernameExists, loginUser, getUserDetails };

