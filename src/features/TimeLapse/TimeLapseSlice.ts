import { createSlice } from "@reduxjs/toolkit";
interface TimeLapseType {
  id: string | number;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  coordinates: [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ];
}
const initialState: TimeLapseType[] = [];

const TimeLapseSlice = createSlice({
  name: "timeLapse",
  initialState: initialState,
  reducers: {
    addTimeLapseAction: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { addTimeLapseAction } = TimeLapseSlice.actions;
export default TimeLapseSlice.reducer;
