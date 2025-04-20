import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/orders`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("x-auth-source", "custom");
    }
    return headers;
  },
  credentials: "include", // if you're using cookies
});

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery,
  tagTypes: ["Orders" , "NFTOrders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["NFTOrders"], // Invalidate NFTOrders tag to refetch data
    }),
    getOrderByEmail: builder.query({
      query: () => ({
        url: `/getMyOrders`, // Correct route for fetching the user's orders
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByEmailQuery } = ordersApi;

export default ordersApi;
