const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const hashPassword = async( password) =>{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password , salt);
    return hashPassword;
}
const comparePassword = async (password, hashPassword) => {
    const isPasswordMatch = await bcrypt.compare(password, hashPassword);
    return isPasswordMatch;
}

const signJwtToken = async (data) => {
    try {
        const token = jwt.sign({ id: data.id, }, process.env.JWT_SECRET, { expiresIn: data.expiresIn, issuer: "kendel", });
        return token
    } catch (err) {
    }
};

module.exports = {
    hashPassword,
    comparePassword,
    signJwtToken,
  };