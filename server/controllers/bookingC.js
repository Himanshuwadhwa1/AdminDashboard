const Booking = require("../model/booking.js");
const Customer = require("../model/customer.js");
const ServiceProvider = require("../model/serviceProvide.js");

const addMultipleBookings = async (req, res) => {
    try {
        const bookings = req.body.bookings;

        if (!Array.isArray(bookings)) {
            return res
                .status(400)
                .json({ message: "Bookings data should be an array" });
        }

        const createdBookings = await Booking.insertMany(bookings);

        for (const booking of createdBookings) {
            await Customer.findByIdAndUpdate(booking.customer, {
                $push: { bookingHistory: booking._id },
            });

            await ServiceProvider.findByIdAndUpdate(booking.serviceProvider, {
                $push: { bookingHistory: booking._id },
            });
        }

        res.status(201).json({
            message: "Bookings created successfully",
            bookings: createdBookings,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getAllPaymentStatus = async (req, res) => {
    try {
        const payments = await Booking.find({})

        res.status(200).json(payments);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {
    addMultipleBookings,
    getAllPaymentStatus
};
