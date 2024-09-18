const express = require("express");
const { addMultipleBookings, getAllPaymentStatus } = require("../controllers/bookingC");

const bookingRouter = express.Router();

bookingRouter.post("/multiple", addMultipleBookings);
bookingRouter.get("/getStatus",getAllPaymentStatus);
module.exports = {bookingRouter};
