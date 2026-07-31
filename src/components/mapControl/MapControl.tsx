import React, { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { ControlPosition } from "react-map-gl/mapbox";
import { useControl } from "react-map-gl/mapbox";

interface MapControlProps {
  position?: ControlPosition; //  'top-left' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left';
  children?: ReactNode;
}

class CustomControlContainer {
  private onMount: (el: HTMLDivElement) => void;
  private onUnmount: () => void;
  private container: HTMLDivElement | null = null;

  constructor(onMount: (el: HTMLDivElement) => void, onUnmount: () => void) {
    this.onMount = onMount;
    this.onUnmount = onUnmount;
    this.preventMapEvents = this.preventMapEvents.bind(this);
  }

  private preventMapEvents(e: Event): void {
    e.stopPropagation();
  }

  public onAdd(): HTMLDivElement {
    this.container = document.createElement("div");
    this.container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";

    this.container.addEventListener("mousedown", this.preventMapEvents);
    this.container.addEventListener("click", this.preventMapEvents);
    this.container.addEventListener("dblclick", this.preventMapEvents);
    this.container.addEventListener("wheel", this.preventMapEvents);
    this.container.addEventListener("touchstart", this.preventMapEvents);

    this.onMount(this.container);

    return this.container;
  }

  public onRemove(): void {
    if (this.container) {
      this.container.removeEventListener("mousedown", this.preventMapEvents);
      this.container.removeEventListener("click", this.preventMapEvents);
      this.container.removeEventListener("dblclick", this.preventMapEvents);
      this.container.removeEventListener("wheel", this.preventMapEvents);
      this.container.removeEventListener("touchstart", this.preventMapEvents);

      if (this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
    }

    this.onUnmount();
  }
}

export const MapControl: React.FC<MapControlProps> = ({
  position = "top-left",
  children,
}) => {
  const [controlContainer, setControlContainer] =
    useState<HTMLDivElement | null>(null);

  useControl(
    () =>
      new CustomControlContainer(
        (el) => setControlContainer(el),
        () => setControlContainer(null),
      ),
    { position },
  );

  if (!controlContainer) return null;

  return createPortal(children, controlContainer);
};
