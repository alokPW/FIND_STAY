//using  a joi

const Joi = require('joi');


module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        price:Joi.string().required().min(0),
        // image:Joi.string().allow("",null),
        // Changes by ChatGPT
        image: Joi.object({
            filename: Joi.string().allow(null, ""), // Allow "filename" to be null or an empty string
            url: Joi.string().uri().allow(null, ""), // Allow "url" to be a valid URI, null, or an empty string
        }).optional(), // The image object itself is optional
        country: Joi.string().required(),  
    }).required(),
});


module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
});