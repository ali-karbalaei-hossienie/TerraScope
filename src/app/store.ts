import { configureStore } from "@reduxjs/toolkit";
import multiMapLayersReducer from "../features/multiMapLayers/multiMapLayersSlice";
import sliderReducer from "../features/slider/sliderSlice";
import timeLapseReducer from "../features/TimeLapse/TimeLapseSlice";
import settingReducer from "../features/setting/settingSlice";

export const store = configureStore({
  reducer: {
    multiMapLayer: multiMapLayersReducer,
    slider: sliderReducer,
    timeLapse: timeLapseReducer,
    setting: settingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
