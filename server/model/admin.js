const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(error){
        console.log(error);
    }
});

AdminSchema.methods.matchPassword = async function (enteredPassword) {
    try{
        return await bcrypt.compare(enteredPassword, this.password);
    }catch(error){
        console.log(error);
    }
};

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
