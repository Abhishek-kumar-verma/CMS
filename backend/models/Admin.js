const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: "",
        },
        password: {
            type: String,
            default: ""
        },
        is_active: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin