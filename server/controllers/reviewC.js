const Review = require("../model/review.js");
const ServiceProvider = require("../model/serviceProvide.js");

const addMultipleReviews = async (req, res) => {
    try {
        const { reviews } = req.body;

        if (!reviews || !Array.isArray(reviews)) {
            return res.status(400).json({
                message: "Invalid input. Provide an array of reviews.",
            });
        }

       
        const insertedReviews = await Review.insertMany(reviews);

        
        for (const review of insertedReviews) {
            await ServiceProvider.findByIdAndUpdate(review.serviceProvider, {
                $push: { reviews: review._id },
            });
        }

        return res.status(201).json({
            message: "Reviews added successfully",
            insertedReviews,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getReviewsByServiceProvider = async (req, res) => {
    try {
        const serviceProviderId = req.params.id;

        const reviews = await Review.find({
            serviceProvider: serviceProviderId,
        }).populate("customer", "name");

        if (!reviews.length) {
            return res.status(404).json({
                message: "No reviews found for this service provider.",
            });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteReviewById = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found." });
        }

        res.status(200).json({
            message: "Review deleted successfully.",
            review: deletedReview,
        });
    } catch (error) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    addMultipleReviews,
    getReviewsByServiceProvider,
    deleteReviewById,
};
