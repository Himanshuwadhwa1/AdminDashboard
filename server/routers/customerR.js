const express = require("express");
const {getAllCustomers,updateCustomer,deleteCustomer,addMultipleCustomers,
} = require("../controllers/customerC");

const tokenHandler = require("../middleware/tokenHandler");

const customerRouter = express.Router();

customerRouter.get("/get", tokenHandler, getAllCustomers);
customerRouter.put("/:id", tokenHandler, updateCustomer);
customerRouter.delete("/:id", tokenHandler, deleteCustomer);

customerRouter.post("/multiple", addMultipleCustomers);

module.exports = {customerRouter};