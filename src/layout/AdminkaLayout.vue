<template>
  <div id="adminka-layout">
    <error-dialog v-if="errorStore.isErrorPresent && errorStore.openErrorDialog"/>
    <user-edit-dialog v-if="userEditDialog.opened"
                      :id="userEditDialog.id"
                      @close="userEditDialog.close()"/>
    <contact-request-edit-dialog v-if="contactEditDialog.opened"
                                 @close="contactEditDialog.close()"/>
    <faq-edit-dialog v-if="faqEditDialog.opened"
                     :id="faqEditDialog.id"
                     @close="faqEditDialog.close()"/>

    <app-toolbar/>
    <adminka-sidebar/>
  </div>
</template>

<script>
import AppToolbar from "@/components/AppToolbar.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import AdminkaSidebar from "@/components/AdminkaSidebar.vue";
import {useHead} from "@unhead/vue";
import UserEditDialog from "@/dialog/UserEditDialog.vue";
import ContactRequestEditDialog from "@/dialog/ContactRequestEditDialog.vue";
import FaqEditDialog from "@/dialog/FaqEditDialog.vue";
import {useContactEditDialogStore, useDialogStore} from "@/stores/dialog.js";
import ErrorDialog from "@/dialog/ErrorDialog.vue";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {
    ErrorDialog,
    FaqEditDialog, ContactRequestEditDialog, UserEditDialog, AppToolbar, AppSidebar, AdminkaSidebar},
  data() {
    return {
      errorStore: useErrorStore(),
      userEditDialog: useDialogStore().getUserEditDialog,
      contactEditDialog: useContactEditDialogStore(),
      faqEditDialog: useDialogStore().getFaqEditDialog
    }
  },
  created() {
    useHead({
      title: 'Adminka - LizzyChat'
    })
  }
}
</script>

<style lang="scss">
#adminka-layout {
  min-height: calc(100svh - $toolbar-height);
  width: 100%;
  position: relative;
  bottom: 0;
  transition: bottom 0.3s ease;
  background-image: linear-gradient(to top, #561772 0%, $main-black 35%);
}
</style>