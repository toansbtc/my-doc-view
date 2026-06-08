import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";

export const myStore = configureStore({
    reducer: {
        category: categorySlice,
    },
});

export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;