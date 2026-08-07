import { configureStore } from "@reduxjs/toolkit";
import multiMapLayersReducer from "../features/multiMapLayers/multiMapLayersSlice";
import sliderReducer from "../features/slider/slider";

export const store = configureStore({
  reducer: { multiMapLayer: multiMapLayersReducer, slider: sliderReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
