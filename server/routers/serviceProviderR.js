const express = require("express");
const {getAllServiceProviders,updateServiceProvider,deleteServiceProvider,addMultipleServiceProviders,
} = require("../controllers/serviceProviderC");
const verifyToken = require("../middleware/tokenHandler");

const serviceProviderRouter = express.Router();

serviceProviderRouter.get("/get", verifyToken, getAllServiceProviders);
serviceProviderRouter.put("/:id", verifyToken, updateServiceProvider);
serviceProviderRouter.delete("/:id", verifyToken, deleteServiceProvider);

serviceProviderRouter.post("/multiple", addMultipleServiceProviders);

module.exports = {serviceProviderRouter};
