import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL'; // Your custom base URL function

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/nft`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('userToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('x-auth-source', 'custom');
      }
      return headers;
    },
  });
  

export const nftApi = createApi({
  reducerPath: 'nftApi',
  baseQuery: baseQuery, // Use the `baseQuery` here
  tagTypes: ['NFTs'],
  endpoints: (builder) => ({
    // 🔁 Get all NFTs
    getAllNFTs: builder.query({
      query: () => '/all',
      providesTags: ['NFTs'],
    }),

    // 👤 NFTs by user email
    getNFTsByUser: builder.query({
      query: (email) => `/user/${email}`,
      providesTags: (result, error, email) => [{ type: 'NFTs', id: email }],
    }),

    // 🆔 NFT by tokenId
    getNFTById: builder.query({
      query: (id) => `/${id}`,
    }),
    
    // In nftApi.js
// In nftApi.js
claimNFT: builder.mutation({
    query: (payload) => ({
      url: '/claim',
      method: 'POST',
      body: payload,
    }),
    invalidatesTags: ['NFTs'], // Invalidate NFTs tag to refetch data
  }),
  
  }),
});

export const {
  useGetAllNFTsQuery,
  useGetNFTsByUserQuery,
  useGetNFTByIdQuery,
  useClaimNFTMutation,
} = nftApi;

export default nftApi;