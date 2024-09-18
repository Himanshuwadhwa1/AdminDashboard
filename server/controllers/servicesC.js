const Service = require("../model/service.js");
const ServiceProvider = require("../model/serviceProvide.js");

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate({
            path: "provider",
            select: "name",
        });
        res.status(200).json(services);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const addService = async (req, res) => {
    try {
        const { name, price, category, subcategory, provider } = req.body;

        const newService = new Service({
            name,
            price,
            category,
            subcategory,
            provider,
        });

        const savedService = await newService.save();

        await ServiceProvider.findByIdAndUpdate(provider, {
            $push: { servicesOffered: savedService._id },
        });

        res.status(201).json({
            message: "Service created successfully",
            service: savedService,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getServicesByProvider = async (req, res) => {
    try {
        const providerId = req.params.providerId;
        const services = await Service.find({ provider: providerId });

        res.status(200).json({ services });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const addMultipleServices = async (req, res) => {
    try {
        const services = req.body.services;

        if (!Array.isArray(services)) {
            return res
                .status(400)
                .json({ message: "Services data should be an array" });
        }

        const createdServices = await Service.insertMany(services);

        for (const service of createdServices) {
            await ServiceProvider.findByIdAndUpdate(service.provider, {
                $push: { servicesOffered: service._id },
            });
        }

        res.status(201).json({
            message: "Services created successfully",
            services: createdServices,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const updateService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const updates = req.body;

        const updatedService = await Service.findByIdAndUpdate(
            serviceId,
            updates,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({
            message: "Service updated successfully",
            service: updatedService,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {
    getAllServices,
    addService,
    getServicesByProvider,
    addMultipleServices,
    updateService,
};
