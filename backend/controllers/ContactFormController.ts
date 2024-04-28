import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Contact, { IContact } from "../models/contact";
import Moment from "moment";
import { extendMoment } from "moment-range";
import ErrorHandler from "../utils/errorHandler";

const moment = extendMoment(Moment);

// Create new booking   =>   /api/bookings
export const newContactForm = catchAsyncErrors(async (req: NextRequest) => {
    const body = await req.json();

    const {
        name,
        surname,
        email,
        subject,
        message,
    } = body;
    const contact = await Contact.create({
        surname,
        email,
        subject,
        message,
        name,
    });

    return NextResponse.json({
        contact,
    });
});

export const getAllContactDetails = catchAsyncErrors(async (req: NextRequest) => {
    const ContactDetails = await Contact.find({});
    return NextResponse.json({
        ContactDetails
    });
});