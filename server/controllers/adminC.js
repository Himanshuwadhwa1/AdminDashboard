const Customer = require("../model/customer.js");
const ServiceProvider = require("../model/serviceProvide.js");
const Booking = require("../model/booking.js");
const Admin = require("../model/admin.js")
const {generateToken} = require("../utils/utils.js");

const getAdminDashboard = async (req, res) => {
    try {
        const totalCustomers = await Customer.countDocuments();
        const totalServiceProviders = await ServiceProvider.countDocuments();
        const totalBookings = await Booking.countDocuments();

        res.json({
            totalCustomers,
            totalServiceProviders,
            totalBookings,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};
const adminRegister = async(req,res)=>{
    const { email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const admin = new Admin({ email, password });
        await admin.save();
        res.status(200).json({
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const loginAdmin = async (req, res) => {
    const { email} = req.body;
    const password = String(req.body.password);
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const isMatch = await admin.matchPassword(password);

        if (!isMatch) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const token = generateToken(admin._id);

        res.json({
            token,
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAdminDashboard,
    adminRegister,
    loginAdmin,
};
