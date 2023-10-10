const express = require('express');
const  Author  = require('../models/Author.js');
const { hashPassword , comparePassword, signJwtToken} = require('../utils/util.js');
const { NotFoundError  , ValidationError } = require("../Error/error.js");

const authorRouter = express.Router();

authorRouter.post("/register",async( req, res ) =>{
    const { name ,email,  password } = req.body;
    if( !name || !email || !password ){
        res.status(400).json({
            status: false,
            data: null,
            message: " !Required name , email , password"
        })
        return;
    }
    const isExist = await Author.findOne({email});
    if( isExist) throw new ValidationError("Email is already exist");
    const encryptPass = await hashPassword(password);
    const newAuthor = new Author({
        name , email , password : encryptPass , 
    });
    const newAuthorSave = await newAuthor.save();
    const token = await signJwtToken({ id: newAuthorSave?._id, expiresIn: "30m" });
    if( newAuthorSave){
        const responseData = {
            name : newAuthorSave.name,
            email : newAuthorSave.email,
        }
        return res.json({
            status : true,
            data : {responseData , token},
            message:"Author registration successful. The new author has been added."
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

authorRouter.post("/login", async(req ,res) => {
    const { email , password } = req.body;
    if( !email || !password){
        return res.status(400).json({
            status: false,
            data: null,
            message: " !Required email , password"
        })
        return;
    }
    const author = await Author.findOne({email});
    if (!author) throw new NotFoundError("Author Not Found")
    const isPasswordMatch = await comparePassword(password, author.password);
    if (!isPasswordMatch) throw new ValidationError("Invalid password")
    const token = await signJwtToken({ id: author?._id, expiresIn: "30m" });
    return res.json({
        status: true,
        data: {
            name: author.name,
            token
        },
        message: "LoggedIn",
    })

})

module.exports = authorRouter