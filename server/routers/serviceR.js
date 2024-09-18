const express = require("express");
const {addService,getServicesByProvider,addMultipleServices,updateService,getAllServices,
} = require("../controllers/servicesC");

const serviceRouter = express.Router();
serviceRouter.get("/get", getAllServices);
serviceRouter.post("/add", addService);
serviceRouter.get("/provider/:providerId", getServicesByProvider);

serviceRouter.post("/multiple", addMultipleServices);
serviceRouter.put("/:id", updateService);

module.exports = {serviceRouter};
