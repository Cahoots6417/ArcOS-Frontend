import { get } from "svelte/store";
import { getWindow, WindowStore } from "./store";

export function isLoaded(id: string): boolean {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id) return true;
  }

  return false;
}

export function isOpened(id: string): boolean {
  const window = getWindow(id);

  if (!window) return false;

  return window.opened;
}

export function isMinimized(id: string): boolean {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id && ws[i].state.windowState.min) return true;
  }

  return false;
}

export function isDisabled(id: string): boolean {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id && ws[i].disabled) return true;
  }

  return false;
}
