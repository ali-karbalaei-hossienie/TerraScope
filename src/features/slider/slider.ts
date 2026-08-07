import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: true,
  timeSlider: null,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState: initialState,
  reducers: {
    toggleSlider: (state) => {
      state.isVisible = !state.isVisible;
    },
    setTime: (state, action) => {
      state.timeSlider = action.payload;
    },
  },
});

export const { toggleSlider, setTime } = sliderSlice.actions;
export default sliderSlice.reducer;
