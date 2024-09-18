const express = require("express");
require("dotenv").config();
const cors = require("cors");
const {connectingDB} = require("./utils/db.js")
const {adminRoutes} = require("./routers/adminR.js");
const { bookingRouter } = require("./routers/bookingR.js");
const {customerRouter} = require("./routers/customerR.js");
const {reviewRouter} = require("./routers/reviewR.js");
const {serviceRouter} = require("./routers/serviceR.js");
const {serviceProviderRouter} = require("./routers/serviceProviderR.js");


const port = process.env.PORT || 3000
const app = express()
connectingDB();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);


app.use("/api/admin",adminRoutes);
app.use("/api/customer", customerRouter);
app.use("/api/service-providers", serviceProviderRouter);
app.use("/api/services", serviceRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/review", reviewRouter);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})