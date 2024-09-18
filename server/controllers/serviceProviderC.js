const ServiceProvider = require("../model/serviceProvide.js");

const addMultipleServiceProviders = async (req, res) => {
    try {
        const serviceProviders = req.body.serviceProviders;

        if (!Array.isArray(serviceProviders)) {
            return res
                .status(400)
                .json({ message: "Service Providers data should be an array" });
        }

        const createdProviders = await ServiceProvider.insertMany(
            serviceProviders
        );

        res.status(201).json({
            message: "Service providers created successfully",
            serviceProviders: createdProviders,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

const getAllServiceProviders = async (req, res) => {
    try {
        const providers = await ServiceProvider.find()
            .populate({
                path: "bookingHistory",
                populate: [
                    {
                        path: "customer",
                        select: "name",
                    },
                    {
                        path: "service",
                        select: "name",
                    },
                ],
            })
            .populate({
                path: "servicesOffered",
                select: "name",
            });

        res.status(200).json(providers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const updateServiceProvider = async (req, res) => {
    try {
        const updatedProvider = await ServiceProvider.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedProvider);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteServiceProvider = async (req, res) => {
    try {
        await ServiceProvider.findByIdAndDelete(req.params.id);
        res.json({ message: "Service provider deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAllServiceProviders,
    addMultipleServiceProviders,
    updateServiceProvider,
    deleteServiceProvider,
};
