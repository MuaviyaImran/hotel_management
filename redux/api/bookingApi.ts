import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    newBooking: builder.mutation({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
      }),
    }),

    checkBookingAvailiability: builder.query({
      query: ({ id, checkInDate, checkOutDate }) => ({
        url: `/bookings/check_room_availability?roomId=${id}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
      }),
    }),

    getBookedDates: builder.query({
      query: (id) => ({
        url: `/bookings/booked_dates?roomId=${id}`,
      }),
    }),

    getSalesStats: builder.query({
      query({ startDate, endDate }) {
        return {
          url: `/admin/sales_stats?startDate=${startDate}&endDate=${endDate}`,
        };
      },
    }),

    deleteBooking: builder.mutation({
      query(id) {
        return {
          url: `/admin/bookings/${id}`,
          method: "DELETE",
        };
      },
    }),

    editBooking: builder.mutation({
      query({ id, body }) {
        return {
          url: `/bookings/edit/${id}`,
          method: "PUT",
          body,
        };
      },

    }),
  }),
});

export const {
  useNewBookingMutation,
  useLazyCheckBookingAvailiabilityQuery,
  useGetBookedDatesQuery,
  useLazyGetSalesStatsQuery,
  useDeleteBookingMutation,
  useEditBookingMutation
} = bookingApi;
