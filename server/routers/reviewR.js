const express = require("express");
const {addMultipleReviews,getReviewsByServiceProvider,deleteReviewById} = require("../controllers/reviewC");
const reviewRouter = express.Router();

reviewRouter.post("/multiple", addMultipleReviews);
reviewRouter.get("/get/:id", getReviewsByServiceProvider);
reviewRouter.delete("/:id", deleteReviewById);

module.exports = {reviewRouter};