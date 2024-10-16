import Joi from "joi";

export const productsValidation = Joi.object().keys({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().required(),
    img: Joi.string().required(),
    categories: Joi.array().optional().allow(null, ""),
    size: Joi.string().optional().allow(null, ""),
    color: Joi.string().optional().allow(null, ""),
    price: Joi.number().required(),
    productId: Joi.string().required()
})

export const orderValidation = Joi.object().keys({
    userId: Joi.string().required(),
    products: Joi.array().required(),
    amount: Joi.number(),
    userAddress: Joi.string().required(),
    status: Joi.string().optional().allow(null, ""),
})