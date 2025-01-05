import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { userSlice } from "../features/auth/userSlice";
import { productApi } from "../features/product/productApi";
import { cartSlice } from "../features/carts/cartSlice";
import { orderApi } from "../features/order/orderApi";
import { reviewApi } from "../features/review/reviewApi";


export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    authApi.middleware,
    productApi.middleware,
    orderApi.middleware,
    reviewApi.middleware
  ])
});