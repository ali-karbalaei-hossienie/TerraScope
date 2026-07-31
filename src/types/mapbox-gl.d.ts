import "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

declare module "mapbox-gl" {
  interface Map {
    draw: MapboxDraw;
  }
}

export {};
