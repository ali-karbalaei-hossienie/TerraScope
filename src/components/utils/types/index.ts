import type {
  AnyLayer,
  CanvasSourceSpecification,
  CustomSourceInterface,
  SourceSpecification,
} from "mapbox-gl";

export interface MapboxLayerConfig {
  id: string;
  sourceProps:
    | SourceSpecification
    | CanvasSourceSpecification
    | CustomSourceInterface<unknown>;

  layer: AnyLayer;
}
