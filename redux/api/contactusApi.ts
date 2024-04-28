import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactusApi = createApi({
    reducerPath: "contactus",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
    }),
    endpoints: (builder) => ({
        newContactus: builder.mutation({
            query: (body) => ({
                url: "/contactus",
                method: "POST",
                body,
            }),
        }),
        getAllContactDetails: builder.mutation({
            query: () => ({
                url: "/getContact",
                method: "GET",
            }),
        })

    }),
});

export const {
    useNewContactusMutation,
    useGetAllContactDetailsMutation,
} = contactusApi;
