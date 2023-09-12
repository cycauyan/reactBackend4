const jwt = require("jsonwebtoken");
const secret = "Test123";

createAccessToken = (existingUser) => {
    const data = {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
    };

    return jwt.sign(data, secret, {});
};

getPayload = (token) => {
    if (token === undefined) {
        return null;
    } else {
        token = token.slice(7, token.length);
        return jwt.verify(token, secret, (error) => {
            if (error) {
                return null;
            } else {
                return jwt.decode(token, { complete: true }).payload;
            }
        });
    }
};

module.exports = { createAccessToken,getPayload };