import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    price: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

export default mongoose.model('Product', ProductSchema);