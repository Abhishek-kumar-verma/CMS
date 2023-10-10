const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name : {
        type : String,
        default : ""
    },
    email : {
        type : String,
        default: "",
    },
    password : {
        type : String, 
        default : "",
    }

}, { timestamps : true});

const Author = new mongoose.model("Author", authorSchema);
module.exports = Author ;