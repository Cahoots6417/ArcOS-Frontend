<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";

  import {
    focusedWindowId,
    getWindow,
    maxZIndex,
    WindowStore,
  } from "../../../ts/applogic/store";
  import { getWindowElement } from "../../../ts/window/main";
  import Window from "./WindowStore/Window.svelte";

  let oa: App[] = [];

  WindowStore.subscribe((v) => {
    oa = [];

    if (v) oa = v;
  });

  focusedWindowId.subscribe((v) => {
    $maxZIndex++;

    if (!v || v.startsWith("error_")) {
      if (!v) return;

      const el = document.querySelector(`#${v}`) as HTMLDivElement;

      if (!el) return;

      el.style.zIndex = `${$maxZIndex}`;

      return;
    }

    const appData = getWindow(v);

    if (!appData) return;

    const element = getWindowElement(appData);

    if (!element) return;

    element.style.zIndex = `${$maxZIndex}`;
  });
</script>

<div class="winstore">
  {#each oa as app}
    {#if app && !app.disabled}
      <Window {app} />
    {/if}
  {/each}
</div>
