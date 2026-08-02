import type {
  CanvasSourceSpecification,
  CustomSourceInterface,
  LayerSpecification,
  SourceSpecification,
} from "mapbox-gl";

export interface ItemLayer {
  sourceId: string;
  source:
    | SourceSpecification
    | CanvasSourceSpecification
    | CustomSourceInterface<unknown>;
  layer: LayerSpecification;
}
export interface UseMultiMapLayers {
  extraLeftLayers?: ItemLayer[];
  extraRightLayers?: ItemLayer[];
}
