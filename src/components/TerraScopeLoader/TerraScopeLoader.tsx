import "./css/TerraScopeLoader.css";
import { useEffect, useState } from "react";

type TerraScopeLoaderProps = {
  visible: boolean;
};

const messages = [
  "Initializing TerraScope",
  "Loading satellite imagery",
  "Fetching weather layers",
  "Preparing dust overlays",
  "Syncing comparison tools",
  "Almost ready",
];

export default function TerraScopeLoader({ visible }: TerraScopeLoaderProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const timer = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, messages.length - 1));
    }, 1500);

    return () => clearInterval(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="tscope-loader">
      <div className="tscope-loader__orbit">
        <div className="tscope-loader__ring tscope-loader__ring--1" />
        <div className="tscope-loader__ring tscope-loader__ring--2" />
        <div className="tscope-loader__ring tscope-loader__ring--3" />
        <div className="tscope-loader__planet" />
        <div className="tscope-loader__satellite" />
        <div className="tscope-loader__blip tscope-loader__blip--1" />
        <div className="tscope-loader__blip tscope-loader__blip--2" />
        <div className="tscope-loader__blip tscope-loader__blip--3" />
      </div>

      <div className="tscope-loader__brand">
        <div className="tscope-loader__title">TerraScope</div>
        <div className="tscope-loader__subtitle">Satellite Intelligence</div>
      </div>

      <div className="tscope-loader__progress">
        <div className="tscope-loader__bar" />
      </div>

      <div className="tscope-loader__status">{messages[messageIndex]}</div>
    </div>
  );
}
