import { writable } from "svelte/store";
import logo from "../../../assets/apps/default.svg";
import AppInfoSvelte from "../../../lib/Apps/AppInfo.svelte";
import type { App } from "../interface";

export const AppInfo: App = {
  info: {
    name: "Application Info",
    description: "View information about an application",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    hidden: true,
    icon: logo,
  },
  size: { w: 500, h: 600 },
  pos: { x: 30, y: 40 },
  minSize: { w: 500, h: 600 },
  maxSize: { w: 500, h: 600 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: AppInfoSvelte,
  glass: false,
  events: {
    close() {
      AppInfoId.set(null);
    },
  },
};

export const AppInfoId = writable<string>(null);
