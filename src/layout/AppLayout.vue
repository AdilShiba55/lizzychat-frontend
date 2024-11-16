<template>
  <div id="app-layout">
    <error-dialog v-if="errorStore.isErrorPresent && errorStore.openErrorDialog"/>
    <contact-dialog v-if="contactDialog.opened"
                    @close="contactDialog.close()"/>
    <login-dialog v-if="loginDialog.opened"
                  :current-form="loginDialog.formNum"
                  @close="loginDialog.close()"/>
    <add-balance-dialog v-if="addBalanceDialog.opened"
                        @close="addBalanceDialog.close()"/>
    <unlock-character-dialog v-if="unlockCharacterDialog.opened"
                             @close="unlockCharacterDialog.close()"/>
    <get-premium-plan-dialog v-if="getPremiumDialog.opened"
                             @close="getPremiumDialog.close()"/>
    <character-details-sidebar v-if="characterDetailsSidebar.character"/>

    <app-toolbar/>
    <app-sidebar/>
  </div>
</template>

<script>
import AppToolbar from "@/components/AppToolbar.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import ProgressCircular from "@/components/ProgressCircular.vue";
import CharacterDetailsSidebar from "@/components/CharacterDetailsSidebar.vue";
import ContactDialog from "@/dialog/ContactDialog.vue";
import LoginDialog from "@/dialog/LoginDialog.vue";
import AddBalanceDialog from "@/dialog/AddBalanceDialog.vue";
import UnlockCharacterDialog from "@/dialog/UnlockCharacterDialog.vue";
import GetPremiumPlanDialog from "@/dialog/GetPremiumPlanDialog.vue";
import {useContactDialogStore, useDialogStore} from "@/stores/dialog.js";
import {useCharacterDetailsSidebar} from "@/stores/characterDetailsSidebar.js";
import ErrorDialog from "@/dialog/ErrorDialog.vue";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {
    ErrorDialog,
    GetPremiumPlanDialog,
    UnlockCharacterDialog,
    AddBalanceDialog,
    LoginDialog, ContactDialog, CharacterDetailsSidebar, ProgressCircular, AppToolbar, AppSidebar
  },
  data() {
    return {
      errorStore: useErrorStore(),
      contactDialog: useContactDialogStore(),
      loginDialog: useDialogStore().getLoginDialog,
      addBalanceDialog: useDialogStore().getAddBalanceDialog,
      unlockCharacterDialog: useDialogStore().getUnlockCharacterDialog,
      getPremiumDialog: useDialogStore().getPremiumDialog,
      characterDetailsSidebar: useCharacterDetailsSidebar()
    }
  }
}
</script>

<style lang="scss">
#app-layout {
  min-height: calc(100svh - $toolbar-height);
  width: 100%;
  position: relative;
  bottom: 0;
  transition: bottom 0.3s ease;
  background-image: linear-gradient(to top, #561772 0%, $main-black 35%);
}
</style>