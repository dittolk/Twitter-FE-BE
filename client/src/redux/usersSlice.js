import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {},
  };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setData: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setData } =
  userSlice.actions;

export default userSlice.reducer;