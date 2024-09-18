const express = require("express");
const tokenHandler = require("../middleware/tokenHandler.js");
const {getAdminDashboard,loginAdmin,adminRegister} = require("../controllers/adminC.js")

const adminRoutes = express.Router();

adminRoutes.get("/dashboard",tokenHandler,getAdminDashboard);
adminRoutes.post("/register",adminRegister);
adminRoutes.post("/login",loginAdmin);

module.exports = {adminRoutes};