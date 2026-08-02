import { createSlice } from "@reduxjs/toolkit";
import { LAYERS } from "../../components/MultiMapLayers/constants/layers";
import type { MultiMapLayer } from "../../components/MultiMapLayers/types/mapLayerType";

const initialState: MultiMapLayer = {
  selectedBaseLayers: [LAYERS[0]],
  selectedRightLayers: [LAYERS[0]],
  selectedLeftLayers: [LAYERS[0]],
  isSplitMode: false,
};

const multiMapLayersSlice = createSlice({
  name: "multiMapLayers",
  initialState: initialState,
  reducers: {
    setSelectedBaseLayers: (state, action) => {
      state.selectedBaseLayers = [action.payload];
    },
    setSelectedLeftLayers: (state, action) => {
      state.selectedLeftLayers = [action.payload];
    },
    setSelectedRightLayers: (state, action) => {
      state.selectedRightLayers = [action.payload];
    },
    setIsSplitMode: (state, action) => {
      state.isSplitMode = action.payload;
    },
  },
});

export const {
  setSelectedBaseLayers,
  setSelectedLeftLayers,
  setSelectedRightLayers,
  setIsSplitMode,
} = multiMapLayersSlice.actions;
export default multiMapLayersSlice.reducer;
