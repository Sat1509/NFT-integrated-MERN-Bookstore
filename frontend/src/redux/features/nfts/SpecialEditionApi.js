// frontend/src/redux/api/SpecialEditionsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/special-edition`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const specialEditionsApi = createApi({
  reducerPath: 'specialEditionsApi',
  baseQuery,
  tagTypes: ['SpecialEditions'],
  endpoints: (builder) => ({
    // Admin: Create special edition book
    createSpecialEdition: builder.mutation({
      query: (newBook) => ({
        url: '/',
        method: 'POST',
        body: newBook
      }),
      invalidatesTags: ['SpecialEditions']
    }),

    // Get all special editions
    getSpecialEditions: builder.query({
      query: () => '/',
      providesTags: ['SpecialEditions']
    }),

    // Get single special edition by ID
    getSpecialEditionById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'SpecialEditions', id }]
    }),

    // User purchase special edition
    purchaseSpecialEdition: builder.mutation({
      query: (bookId) => ({
        url: '/purchase',
        method: 'POST',
        body: { bookId }
      }),
      invalidatesTags: ['SpecialEditions']
    }),

    // Add this inside endpoints
    updateSpecialEdition: builder.mutation({
      query: ({ id, ...updatedFields }) => ({
        url: `/update-book/${id}`, // include id in URL path
        method: 'PUT',
        body: updatedFields,       // send only updated fields in body
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'SpecialEditions', id },
        { type: 'SpecialEditions' } // also invalidate the list
      ],
    }),
    
    deleteSpecialEdition: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'SpecialEditions', id },
        { type: 'SpecialEditions' }
      ],
    }),
    

  })
})

export const {
  useCreateSpecialEditionMutation,
  useGetSpecialEditionsQuery,
  useGetSpecialEditionByIdQuery,
  usePurchaseSpecialEditionMutation,
  useUpdateSpecialEditionMutation,
  useDeleteSpecialEditionMutation
} = specialEditionsApi

export default specialEditionsApi
