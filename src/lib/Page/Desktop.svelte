<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import "../../css/desktop.css";
  import { ConnectedServer } from "../../ts/api/main";
  import { importAutoLoaders } from "../../ts/applogic/aftermarket/autoload";
  import { importDefault } from "../../ts/applogic/imports";
  import { startKeyListener } from "../../ts/applogic/keyboard/listener";
  import {
    isFullscreenWindow,
    updateStores,
    WindowStore as WStore,
  } from "../../ts/applogic/store";
  import {
    assignDesktopListeners,
    desktopClassNames,
    loggingOff,
    showDesktop,
    startOpened,
  } from "../../ts/desktop/main";
  import { DevModeOverride } from "../../ts/devmode/props";
  import { ErrorMessages } from "../../ts/errorlogic/app";
  import { startMessageCheckInterval } from "../../ts/messaging/interval";
  import { UserData, UserName } from "../../ts/userlogic/interfaces";
  import ArcFind from "./Desktop/ArcFind.svelte";
  import ContextMenu from "./Desktop/ContextMenu.svelte";
  import ErrorDialogStore from "./Desktop/ErrorDialogStore.svelte";
  import PushNotification from "./Desktop/PushNotification.svelte";
  import Shell from "./Desktop/Shell.svelte";
  import Wallpaper from "./Desktop/Wallpaper.svelte";
  import WindowStore from "./Desktop/WindowStore.svelte";

  let show = false;
  let classes = "";

  desktopClassNames.subscribe((v) => (classes = v));
  showDesktop.subscribe((v) => (show = v));

  onMount(() => {
    assignDesktopListeners();
    importDefault();
    resetDesktopState();
    startKeyListener();

    importAutoLoaders();

    setTimeout(() => (show = true), 250);

    if (get(ConnectedServer)) startMessageCheckInterval();
  });

  function resetDesktopState() {
    WStore.set([]);
    isFullscreenWindow.set(false);
    updateStores();
    startOpened.set(false);
    loggingOff.set(false);
    ErrorMessages.set([]);
    DevModeOverride.set($UserData.devmode);
  }
</script>

{#if $UserData && $UserName && !$loggingOff}
  <div
    class="desktop theme-{$UserData.sh.desktop.theme} tb-{$UserData.sh.taskbar
      .pos} fullscreen {classes}"
    class:show
  >
    <Wallpaper />
    <WindowStore />
    <ErrorDialogStore />
    <Shell />
    <PushNotification />
    <ContextMenu />
    <ArcFind />
  </div>
{/if}
