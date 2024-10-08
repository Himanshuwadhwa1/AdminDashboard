const Customer = require("../model/customer.js");

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate({
            path: "bookingHistory",
            populate: [
                {
                    path: "serviceProvider",
                    select: "name", 
                },
                {
                    path: "service",
                    select: "name price",
                },
            ],
        });

        res.status(200).json(customers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const addMultipleCustomers = async (req, res) => {
    try {
        const customers = req.body.customers;
        if (!Array.isArray(customers)) {
            return res
                .status(400)
                .json({ message: "Customers data should be an array" });
        }

        const createdCustomers = await Customer.insertMany(customers);

        res.status(201).json({
            message: "Customers created successfully",
            customers: createdCustomers,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedCustomer);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: "Customer deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAllCustomers,
    addMultipleCustomers,
    updateCustomer,
    deleteCustomer,
};
