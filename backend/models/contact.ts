import mongoose, { Document, Schema } from "mongoose";
export interface IContact extends Document {
    email?: string;
    surname?: string;
    message?: string;
    subject?: string;
    name?: string;
}

const conatctSchema: Schema<IContact> = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
    },
    surname: {
        type: String,
        required: [true, "Please enter your email"],
    },
    message: {
        type: String,
        required: [true, "Please enter your email"],
    },
    subject: {
        type: String,
        required: [true, "Please enter your email"],
    },
});
export default mongoose.models.Contact ||
    mongoose.model<IContact>("Contact", conatctSchema);