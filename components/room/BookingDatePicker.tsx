"use client";

import { IRoom } from "@/backend/models/room";
import { calculateDaysOfStay } from "@/helpers/helpers";
import {
  useGetBookedDatesQuery,
  useNewBookingMutation,
  useLazyCheckBookingAvailiabilityQuery,
} from "@/redux/api/bookingApi";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

interface Props {
  room: IRoom;
}
const BookingDatePicker = ({ room }: Props) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [daysOfStay, setDaysOfStay] = useState(0);

  const router = useRouter();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [checkBookingAvailability, { data }] =
    useLazyCheckBookingAvailiabilityQuery();

  const isAvailable = data?.isAvailable;
  const { data: { bookedDates: dates } = {} } = useGetBookedDatesQuery(
    room?._id
  );

  const excludeDates = dates?.map((date: string) => new Date(date)) || [];

  const onChange = (dates: Date[]) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      const days = calculateDaysOfStay(checkInDate, checkOutDate);

      setDaysOfStay(days);

      // Check Booking Availiability
      checkBookingAvailability({
        id: room?._id,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
      });
    }
  };

  const [newBooking, { error, isLoading, data: checkoutData }] =
    useNewBookingMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (checkoutData) {
      router.push(`${process.env.API_URL}bookings/me`);
    }
  }, [error, checkoutData]);
  const generateRandomPaymentId = () => {
    return Math.floor(Math.random() * 900000) + 100000;
  };
  const bookRoom = () => {
    const amount = room?.pricePerNight * daysOfStay;
    const checkoutData = {
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      amountPaid: amount,
      room: room?._id,
      name: room?.name,
      paymentInfo: {
        id: generateRandomPaymentId().toString(),
        status: "paid",
      },
      daysOfStay,
      amount,
    };
    newBooking(checkoutData);
  };

  return (
    <div className="booking-card shadow p-4">
      <p className="price-per-night">
        <b>£{room?.pricePerNight}</b> / night
      </p>
      <hr />
      <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>

      <DatePicker
        className="w-100"
        selected={checkInDate}
        onChange={onChange}
        minDate={new Date()}
        startDate={checkInDate}
        endDate={checkOutDate}
        excludeDates={excludeDates}
        selectsRange
        inline
      />

      {isAvailable === true && (
        <div className="alert alert-success my-3 font-weight-bold">
          Room is available. Book now.
        </div>
      )}

      {isAvailable === false && (
        <div className="alert alert-danger my-3 font-weight-bold">
          Room not available. Try different dates.
        </div>
      )}

      {isAvailable && !isAuthenticated && (
        <div className="alert alert-danger my-3 font-weight-bold">
          Login to book the room.
        </div>
      )}

      {isAuthenticated && isAvailable && (
        <button
          className="btn py-3 form-btn w-100"
          onClick={bookRoom}
          disabled={isLoading}
        >
          Pay - £{room?.pricePerNight * daysOfStay}
        </button>
      )}
    </div>
  );
};
export default BookingDatePicker;
