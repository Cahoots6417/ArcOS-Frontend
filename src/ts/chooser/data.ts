import ChooserOverlay from "../../lib/Apps/ChooserOverlay.svelte";
import type { OverlayableApp } from "../applogic/interface";

export function generateChooserOverlayData(
  title: string = "Choose File"
): OverlayableApp {
  return {
    info: {
      name: title,
      author: "ArcOS Generated",
      version: "1",
    },
    size: { w: 540, h: 350 },
    show: true,
    id: `CHOOSER#${Math.floor(Math.random() * 1e6)}`,
    content: ChooserOverlay,
  };
}
