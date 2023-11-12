import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./usersSlice";

export const store = configureStore({
    reducer:{
        user: userSlice,
    },
})