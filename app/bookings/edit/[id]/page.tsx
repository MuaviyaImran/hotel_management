import Error from "@/app/error";
import EditBookingDetails from "@/components/booking/EditBookingDetails";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "Booking Edit Details",
  description: "Booking Edit Details page",
};

export const dynamic = "force-dynamic";
const getBooking = async (id: string) => {
  const authHeader = getAuthHeader();
  const res = await fetch(
    `${process.env.API_URL}/api/bookings/${id}`,
    authHeader
  );
  return res.json();
};

export default async function MyBookingsEditPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getBooking(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <EditBookingDetails data={data} />;
}
