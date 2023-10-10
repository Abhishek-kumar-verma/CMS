const jwt = require('jsonwebtoken');
const {AuthError } = require('../Error/error.js');
const Author = require("../models/Author.js")
const Admin =require("../models/Admin.js");
require("dotenv").config();

async function validToken( req, res, next) {
    const bearerHeader = req.headers['authorization'] || "";
    const[ bearer , bearerToken] = bearerHeader.split(" ");

    if( !bearerToken) throw new AuthError("UnAuthorized");
    try{
        const decodeToken = jwt.verify( bearerToken, process.env.JWT_SECRET);
        const authorId = decodeToken.authorId;
        const isAuthorExist = await Author.find({_id : authorId});
        if( !isAuthorExist) throw new AuthError("Author not found");
        req.authorId = authorId;
        next();
    }catch(error) {
        return res.status(401)
            .json({ status: false, data: null, message: "Invalid token" });
    }
};
    
async function isAdmin (req, res, next) {
    const bearerHeader = req.headers["authorization"] || "";
    const [bearer, bearerToken] = bearerHeader.split(" ");

    if (!bearerToken) throw new AuthError("UnAuthorized")
    try {
        const decodedToken = jwt.verify(bearerToken, jwtSecret);
        const adminId = decodedToken.id;
        const isAdminExists = await db.AdminConfig.findById(adminId);
        if (!isAdminExists) throw new AuthError("Invalid admin")
        req.id = adminId;
        next();

    } catch (error) {
        return res.status(401)
            .json({ status: false, data: null, message: "Invalid token" });
    }
};

module.exports = {
    validToken,
    isAdmin
}

    
