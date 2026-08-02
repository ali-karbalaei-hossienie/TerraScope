export interface LayerType {
  id: string | number;
  name: string;
  image: string;
  tile: string;
}
export interface MultiMapLayer {
  selectedBaseLayers: LayerType[];
  selectedRightLayers: LayerType[];
  selectedLeftLayers: LayerType[];
  isSplitMode: boolean;
}
