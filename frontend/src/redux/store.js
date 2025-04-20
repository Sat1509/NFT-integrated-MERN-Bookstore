import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import booksApi from "./features/books/booksApi";
import ordersApi from "./features/orders/ordersApi";
import nftOrdersApi from "./features/nfts/nftOrdersApi"; // Import NFT slice
import specialEditionsApi from './features/nfts/SpecialEditionApi'
import nftApi from './features/nfts/nftApi' // Import NFT slice

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [specialEditionsApi.reducerPath]: specialEditionsApi.reducer,  // Add NFT slice
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [nftOrdersApi.reducerPath]: nftOrdersApi.reducer, // Add NFT slice
    [nftApi.reducerPath]: nftApi.reducer, // Add NFT slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware, specialEditionsApi.middleware,nftOrdersApi.middleware, nftApi.middleware), // Add NFT middleware
});

export default store;
