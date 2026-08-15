import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  timeSlider: null,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState: initialState,
  reducers: {
    setVisibleSlider: (state, action) => {
      state.isVisible = action.payload;
    },
    setTime: (state, action) => {
      state.timeSlider = action.payload;
    },
  },
});

export const { setVisibleSlider, setTime } = sliderSlice.actions;
export default sliderSlice.reducer;
