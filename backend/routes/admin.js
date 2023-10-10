const express = require('express');
const { default: Admin } = require('../models/Admin');
const adminRoutes = express.Router();
const { hashPassword , comparePassword, signJwtToken} = require('../utils/util.js');
const { NotFoundError  , ValidationError } = require("../Error/error.js")


adminRoutes.post("/register",async( req, res ) =>{
    const { name ,email,  password , is_active} = req.body;
    if( !name || !email || !password || !is_active) throw new ValidationError("!Requred name , email")
    const isExist = await Admin.find({email});
    if( isExist) throw new ValidationError("Email is already exist");
    const encryptPass = await hashPassword(passord);
    const newAdmin = new Admin({
        name , email , password : encryptPass , is_active
    });
    const newAdminSave = await newAdmin.save();
    if( newAdminSave){
        const responseData = {
            name : newAdminSave.name,
            email : newAdminSave.email,
        }
        return res.json({
            status : true,
            data : responseData,
            message:"Admin registration successful. The new admin has been added."
        })
    }
    else {
        return res.json({
          status: false,
          data: null,
          msg: "Something went wrong! Try again!",
        });
      }
});

adminRoutes.post("/login", async(req ,res) => {
    const { email , password } = req.body;
    if( !email || !password) throw new ValidationError(" !Required name , password")
    const admin = await Admin.find({email});
    if (!admin) throw new NotFoundError("Admin Not Found")
    const isPasswordMatch = await comparePassword(password, admin.password);
    if (!isPasswordMatch) throw new ValidationError("Invalid password")
    const token = await signJwtToken({ id: admin?._id, expiresIn: "30m" });
    return res.json({
        status: true,
        data: {
            name: admin.name,
            token
        },
        message: "LoggedIn",
    })

})

module.exports = adminRoutes;