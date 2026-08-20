<div align="center">

<h1>TerraScope</h1>

<p><strong>An interactive satellite imagery and weather map platform</strong></p>

<p>
  Dynamic Earth visualization, time-based satellite layers, side-by-side imagery comparison,
  weather data, and advanced map drawing tools — built with React, Mapbox GL,
  NASA GIBS/WMTS, MapTiler, and Geoman.
</p>

<p>
  <a href="https://terra-scope-eosin.vercel.app/">
    <strong>Live Demo</strong>
  </a>
</p>

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![Mapbox GL](https://img.shields.io/badge/Mapbox%20GL-3-000000?logo=mapbox&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-9-007fff?logo=mui&logoColor=white)

</div>

---

## Overview

**Live:** [terra-scope-eosin.vercel.app](https://terra-scope-eosin.vercel.app/)

**TerraScope** is an interactive platform for exploring and analyzing satellite imagery and weather data on an interactive map. Satellite imagery and weather data are sourced from **NASA**, while base maps and map styles are provided by **MapTiler**.

Users can explore satellite imagery in two modes: **Single View** and **Split View**. Split View is designed specifically for satellite imagery and allows users to display and compare two different satellite layers side by side—for example, imagery from different dates or different NASA data products.

TerraScope also supports selecting satellite layers, choosing dates, and playing timelapse imagery, enabling users to visually inspect changes across Earth’s surface over time. Weather data and weather-related layers can be explored independently on the map.

Built with **React** and **Mapbox GL**, TerraScope supports both **Persian** and **English**. Its interface dynamically adapts between **right-to-left (RTL)** and **left-to-right (LTR)** layouts to provide a seamless multilingual experience.

---

## Demo

### Satellite Imagery Comparison

<div align="center">
  <img
    src="./public/screenshots/terrascope-demo.gif"
    alt="Comparing satellite imagery layers in Split View"
    width="900"
  />
</div>

## Features

### Satellite Imagery

- **NASA satellite imagery** — explore satellite imagery layers provided through NASA GIBS/WMTS services.
- **Single View mode** — inspect one satellite image layer in a focused full-map view.
- **Split View mode** — compare two satellite imagery layers side by side on synchronized maps.
- **Layer comparison** — compare imagery from different dates, layer types, or satellite data products.
- **Date-based imagery selection** — select available imagery dates to inspect a location at different points in time.
- **Timelapse playback** — animate satellite imagery across a time range to visualize changes over time.
- **Satellite layer management** — select, add, remove, and control the visibility of imagery layers.

### Weather

- **NASA weather data** — explore weather-related data sourced from NASA services.
- **Independent weather view** — view weather data and layers separately from the satellite imagery comparison experience.
- **Interactive weather exploration** — navigate the map to inspect weather information across different regions.

### Map & Navigation

- **MapTiler base maps** — display map styles and base map layers provided by MapTiler.
- **Preserved map camera** — switch map layers and views without losing the current location, zoom level, or orientation.
- **Coordinate display** — view live latitude and longitude values as the cursor moves across the map.
- **Click-to-copy coordinates** — quickly copy selected map coordinates for reuse.
- **Smooth navigation controls** — zoom, rotate, reset orientation, return to the default view, and move around the map easily.

### Drawing Tools

- **Interactive map drawing** — create custom annotations directly on the map with Geoman.
- **Markers and shapes** — draw markers, polylines, polygons, rectangles, and circles.
- **Edit and remove drawings** — modify or delete existing drawings whenever needed.
- **Map workspace experience** — use drawings to highlight areas, outline regions, or annotate map-based observations.

### User Experience

- **Bilingual interface** — full support for **English** and **Persian**.
- **Dynamic RTL/LTR support** — the interface adapts dynamically between right-to-left and left-to-right layouts.
- **Responsive design** — designed to provide a usable mapping experience across different screen sizes.
- **Windy-inspired map interface** — a map-centric interface focused on easy access to imagery, weather data, layers, and controls.

---

## Tech Stack

| Category             | Technologies                 |
| -------------------- | ---------------------------- |
| Frontend Framework   | React 19                     |
| Language             | TypeScript                   |
| Build Tool           | Vite                         |
| Map Rendering        | Mapbox GL / React Map GL     |
| Base Maps & Styles   | MapTiler                     |
| Satellite Imagery    | Soaratlas                    |
| Weather Data         | NASA data services           |
| Drawing Tools        | Geoman                       |
| UI Components        | Material UI (MUI)            |
| Internationalization | i18next                      |
| Styling              | Emotion / MUI styling system |
| Deployment           | Vercel                       |

---

## Data Sources

| Source                                | Usage                                            |
| ------------------------------------- | ------------------------------------------------ |
| [soarAtlas](https://soaratlas.com/)   | Satellite imagery                                |
| NASA data services                    | Weather and environmental map data               |
| [MapTiler](https://www.maptiler.com/) | Base maps, map styles, and geographic map layers |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) — version `18` or later recommended
- npm, pnpm, or yarn

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/ali-karbalaei-hossienie/terra-scope.git
   cd terra-scope
   npm install
   npm run dev

```
