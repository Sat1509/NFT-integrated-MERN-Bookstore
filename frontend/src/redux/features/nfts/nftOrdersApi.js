// frontend/src/redux/api/NFTOrdersApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/nft-order`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('userToken')
    console.log('Token attached to request:', token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
      headers.set('x-auth-source', 'custom') 
    }
    return headers
  }
})

const nftOrdersApi = createApi({
  reducerPath: 'nftOrdersApi',
  baseQuery,
  tagTypes: ['NFTOrders'],
  endpoints: (builder) => ({
    // Get NFT orders by user email
    getNFTOrdersByUserEmail: builder.query({
      query: () => '/user',
      providesTags: ['NFTOrders']
    }),

    // Get claimed NFTs by user email
    getClaimedNFTsByUserEmail: builder.query({
      query: () => '/claimed/user',
      providesTags: ['NFTOrders']
      //providesTags: ['NFTs'], 
    }),

    // Delete NFT order
    deleteNFTOrder: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['NFTOrders']
    })
  })
})

export const {
  useGetNFTOrdersByUserEmailQuery,
  useGetClaimedNFTsByUserEmailQuery,
  useDeleteNFTOrderMutation
} = nftOrdersApi

export default nftOrdersApi
