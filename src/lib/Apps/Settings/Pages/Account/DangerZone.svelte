<script lang="ts">
  import { errorMessage } from "../../../../../ts/errorlogic/main";
  import Notice from "../../../../Page/Desktop/WindowStore/Window/Notice.svelte";
  import Section from "../../Section.svelte";
  import warning from "../../../../../assets/apps/error.svg";
  import { UserName } from "../../../../../ts/userlogic/interfaces";
  import { deleteUser } from "../../../../../ts/userlogic/main";
  import OptionSection from "../../OptionSection.svelte";
  import { ConnectedServer } from "../../../../../ts/api/main";
  import { showOverlay } from "../../../../../ts/window/overlay";
  import { createOverlayableError } from "../../../../../ts/errorlogic/overlay";

  function deleteAccount() {
    createOverlayableError(
      {
        title: "Delete ArcOS Account",
        message:
          "Are you sure you want to delete your ArcOS account? This will delete any and all user data associated with this account. These changes cannot be reverted.",
        image: warning,
        buttons: [
          { action: () => deleteUser($UserName), caption: "Proceed" },
          { action: () => {}, caption: "Back to safety" },
        ],
      },
      "SettingsApp"
    );
  }

  function changeName() {
    showOverlay("changeUsername", "SettingsApp");
  }

  function changePswd() {
    showOverlay("changePswd", "SettingsApp");
  }
</script>

<OptionSection title="Delete account" context="Delete your ArcOS account">
  <button on:click={deleteAccount}> Delete account... </button>
</OptionSection>
{#if $ConnectedServer}
  <OptionSection
    title="Change username"
    context="Migrate your userdata to another username."
  >
    <button on:click={changeName}> Change... </button>
  </OptionSection>
  <OptionSection
    title="Change password"
    context="Change the password you use to log in."
  >
    <button on:click={changePswd}> Change... </button>
  </OptionSection>
{/if}
