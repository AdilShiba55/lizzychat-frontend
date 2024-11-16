<template>
  <v-toolbar id="app-toolbar" density="compact" fixed>
    <div class="left-container">
      <v-btn v-if="authStore.isLoginChecked && toolbarStore.isBackPathPresent"
             class="back-button" :to="toolbarStore.getBackPath"
             icon="mdi-arrow-left-bold"/>
      <v-app-bar-nav-icon v-else
                          @click="sidebarStore.changeExpanded()"/>

      <v-toolbar-title>
        <span class="app-name">lizzychat</span>
      </v-toolbar-title>
    </div>
    <div class="buttons" v-if="authStore.isLoginChecked">
      <template v-if="!authStore.isAuthorized">
        <div>
          <v-btn class="log-button"
                 variant="outlined"
                 @click="loginDialog.openLoginOrVerify()"
                 rounded
                 block>LOG IN</v-btn>
        </div>
        <div>
          <v-btn class="reg-button"
                 @click="loginDialog.openRegister()"
                 block>SIGN UP</v-btn>
        </div>
      </template>
      <template v-if="authStore.isUserInfoPresent">
        <premium-button v-if="toolbarStore.isDiscountButtonShown && !authStore.isPremium"
                        @click="toPremium"/>
        <simple-user-nav/>
      </template>
    </div>
  </v-toolbar>
</template>

<script>
import {useAuthStore} from "@/stores/auth.js";
import router from "@/router/index.js";
import {useSidebarStore} from "@/stores/sidebar.js";
import LoginDialog from "@/dialog/LoginDialog.vue";
import {useDialogStore} from "@/stores/dialog.js";
import SimpleUserNav from "@/components/SimpleUserNav.vue";
import {useToolbarStore} from "@/stores/toolbar.js";
import PremiumButton from "@/components/PremiumButton.vue";

export default {
  components: {PremiumButton, SimpleUserNav, LoginDialog},
  data() {
    return {
      authStore: useAuthStore(),
      sidebarStore: useSidebarStore(),
      toolbarStore: useToolbarStore(),
      loginDialog: useDialogStore().getLoginDialog
    }
  },
  computed: {
    getBackPath() {
      console.log('lastPath', this.$router.options.history.state.back)
      return this.toolbarStore.getBackPath
    }
  },
  methods: {
    toPremium() {
      router.push('/premium')
    }
  }
}
</script>

<style lang="scss">
#app-toolbar {
  position: fixed;
  height: $toolbar-height;
  display: flex;
  justify-content: center;
  color: white;
  z-index: 1005;
  background-color: $main-black;
  padding: 0 10px 0 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);

  .left-container {
    display: flex;
    align-items: center;
    gap: 15px;

    .back-button {
      .mdi {
        font-size: 32px;
      }
    }
  }

  .mdi-menu {
    font-size: 32px;
  }

  .v-app-bar-nav-icon {
    margin-inline-start: unset;
  }

  .v-toolbar__content {
    display: flex;
    justify-content: space-between;
    //max-width: $layout-max-width;
    //margin: 0 auto;

    .v-toolbar-title {
      margin-right: 20px;
      .app-name {
        font-weight: bold;
        font-size: 21px;
        color: #ec61a1;
      }
    }

    .actions {
      width: 100%;
    }

    .buttons {
      display: flex;
      gap: 15px;

      .log-button {
        box-shadow: 0 0 14px #efeff2;
      }
    }
  }
}

@media (max-width: 600px) {
  #app-toolbar {
    .v-toolbar__content {
      .v-toolbar-title {
        display: none;
      }
    }
  }
}
</style>