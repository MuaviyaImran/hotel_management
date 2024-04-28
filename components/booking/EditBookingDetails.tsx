"use client";
import { IBooking } from "@/backend/models/booking";
import { useEffect, useState } from "react";
import { IRoom } from "@/backend/models/room";
import Link from "next/link";
import Image from "next/image";
import { useEditBookingMutation } from "@/redux/api/bookingApi";
import { useRouter } from "next/navigation";
interface Props {
  data: {
    booking: IBooking;
  };
}
const EditBookingDetails = ({ data }: Props) => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<IRoom>();
  const [editBooking, { error, isLoading, isSuccess }] =
    useEditBookingMutation();
  useEffect(() => {
    setBookingData(data.booking);
  }, [data]);
  const submitEditBooking = async (id: string) => {
    editBooking({ id: data?.booking?._id, body: bookingData }).then(
      (res) => {}
    );
    router.push("/bookings/me");
  };
  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-lg-9 mt-5 booking-details">
            {/* Add a back button to navigate the user backe to the dashboard page */}
            <Link href="/admin/bookings" className="ml-2 back-to-search">
              <i className="fa fa-arrow-left me-2"></i>
            </Link>
            <div className="d-flex justify-content-between align-items-center my-5">
              <h2>Booking # {data?.booking?._id}</h2>
            </div>

            <h4 className="mt-5 mb-4">Booking Info</h4>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th scope="row">Check In:</th>
                  <td>
                    {new Date(data?.booking?.checkInDate).toLocaleDateString(
                      "de-DE"
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Check Out:</th>
                  <td>
                    {new Date(data?.booking?.checkOutDate).toLocaleDateString(
                      "de-DE"
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Days of Stay:</th>
                  <td>
                    {data?.booking?.daysOfStay}{" "}
                    {data?.booking?.daysOfStay > 1 ? "days" : "day"}
                  </td>
                </tr>
              </tbody>
            </table>
            {bookingData && (
              <div>
                <div className="d-flex" style={{ margin: "0 40px" }}>
                  <div
                    className="d-flex flex-column w-100 "
                    style={{ marginRight: "20px" }}
                  >
                    <label htmlFor="checkOutDate">
                      <b>Check In Date:</b>
                    </label>
                    <input
                      type="date"
                      id="checkInDate"
                      value={
                        new Date(bookingData?.checkInDate)
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={(e) => {
                        setBookingData((prevState) => ({
                          ...prevState,
                          checkInDate: new Date(e.target.value)?.toISOString(),
                        }));
                      }}
                      name="checkInDate"
                    />
                  </div>
                  <div className="d-flex flex-column w-100">
                    <label htmlFor="checkOutDate">
                      <b>Check Out Date:</b>
                    </label>
                    <input
                      type="date"
                      id="checkOutDate"
                      value={
                        new Date(bookingData?.checkOutDate)
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={(e) => {
                        setBookingData((prevState) => ({
                          ...prevState,
                          checkOutDate: new Date(e.target.value)?.toISOString(),
                        }));
                      }}
                      name="checkOutDate"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn form-btn" onClick={submitEditBooking}>
                    Update
                  </button>
                </div>
              </div>
            )}

            <h4 className="mt-4 mb-4">Booked Room:</h4>

            <hr />
            {data?.booking?.room ? (
              <div className="cart-item my-1">
                <div className="row my-5">
                  <div className="col-4 col-lg-2">
                    <Image
                      src={data?.booking?.room?.images[0]?.url}
                      alt={data?.booking?.room?.name}
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-5">
                    <Link href={`/rooms/${data?.booking?.room?._id}`}>
                      {data?.booking?.room?.name}
                    </Link>
                  </div>

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p>${data?.booking?.room?.pricePerNight}</p>
                  </div>

                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <p>
                      {data?.booking?.daysOfStay}{" "}
                      {data?.booking?.daysOfStay > 1 ? "days" : "day"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="alert alert-danger">Room no longer exists</div>
            )}
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditBookingDetails;
