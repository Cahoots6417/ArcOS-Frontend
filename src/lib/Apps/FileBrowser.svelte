<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import "../../css/desktop/apps/filebrowser.css";
  import type { PartialUserDir, UserFile } from "../../ts/api/interface";
  import { defaultDirectory } from "../../ts/api/interface";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserDirContents,
  } from "../../ts/applogic/apps/FileBrowser/main";
  import type { App } from "../../ts/applogic/interface";
  import { WindowStore } from "../../ts/applogic/store";
  import { ScopedAppData, UserData } from "../../ts/userlogic/interfaces";
  import ListView from "./FileBrowser/ListView.svelte";
  import PathCrumbs from "./FileBrowser/PathCrumbs.svelte";
  import SideBar from "./FileBrowser/SideBar.svelte";
  import TileView from "./FileBrowser/TileView.svelte";
  import TopBar from "./FileBrowser/TopBar.svelte";

  let files: UserFile[] = [];
  let dirs: PartialUserDir[] = [];
  let tiledMode = false;

  export let app: App;
  export let appdata: ScopedAppData;

  UserData.subscribe(() => {
    tiledMode = appdata.tiled as boolean;
  });

  onMount(async () => {
    await fbClass.refresh();

    const currentDir = $FileBrowserDirContents || defaultDirectory;

    files = currentDir.files;
    dirs = currentDir.directories;
  });

  FileBrowserDirContents.subscribe((v) => {
    dirs = v.directories;
    files = v.files;
  });
</script>

<TopBar bind:appdata {app} />
<SideBar />
<div class="content">
  {#if tiledMode}
    <TileView {files} {dirs} />
  {:else}
    <ListView {files} {dirs} />
  {/if}
</div>
