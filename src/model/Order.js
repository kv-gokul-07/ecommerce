import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1, 
            }
        }
    ],
    amount: { type: Number, required: true},
    userAddress: { type: Object, required: true },
    status: { type: String, default: "pending"}
}, { timestamps: true })

export default mongoose.model('Order', orderSchema);