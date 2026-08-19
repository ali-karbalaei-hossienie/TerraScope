import { createSlice } from "@reduxjs/toolkit";
interface SettingType {
  mode: "dark" | "light";
}
const initialState: SettingType = {
  mode: "dark",
};

const settingSlice = createSlice({
  name: "slider",
  initialState: initialState,
  reducers: {
    toggleColorMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleColorMode } = settingSlice.actions;
export default settingSlice.reducer;
