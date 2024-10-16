import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 10
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

export default mongoose.model('User', UserSchema);