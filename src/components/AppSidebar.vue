<template>
  <v-layout id="app-sidebar">
    <v-navigation-drawer
        v-model="sidebarStore.drawer"
        :rail="sidebarStore.rail"
        width="200"
        rail-width="80"
        touchless
        hide-overlay
        permanent
        temporary>

      <v-list density="compact" nav>

        <v-list-item class="premium"
                     title="Premium"
                     value="premium"
                     prepend-icon="mdi-treasure-chest"
                     :active="isActive('/premium')"
                     @click="toAndCloseSidebar('/premium')"></v-list-item>

        <v-list-item prepend-icon="mdi-account-circle"
                     title="Profile"
                     value="profile"
                     :active="isActive('/profile')"
                     @click="toOrLogin('/profile')"></v-list-item>

        <v-list-item prepend-icon="mdi-information-variant-circle"
                     title="Explore"
                     value="explore"
                     :active="isActive('/explore')"
                     @click="toAndCloseSidebar('/explore')"></v-list-item>

        <v-list-item prepend-icon="mdi-chat-processing"
                     title="Chat AI"
                     value="chat"
                     :active="isActive('/chat')"
                     @click="toOrLogin('/chat')"></v-list-item>

        <v-list-item prepend-icon="mdi-camera"
                     title="Gallery"
                     value="gallery"
                     :active="isActive('/gallery')"
                     @click="toOrLogin('/gallery')"></v-list-item>

        <v-list-item prepend-icon="mdi-account-plus"
                     title="My AI"
                     value="myAI"
                     :active="isActive('/myAI')"
                     @click="toOrLogin('/myAI')"></v-list-item>

        <v-list-item prepend-icon="mdi-head-question-outline"
                     title="FAQ"
                     value="faq"
                     :active="isActive('/faq')"
                     @click="toAndCloseSidebar('/faq')"></v-list-item>
      </v-list>

      <v-list density="compact" nav>

        <v-list-item v-if="authStore.isAdmin"
                     prepend-icon="mdi-shield-crown"
                     title="Adminka"
                     value="adminka"
                     :active="false"
                     @click="toAdminka"/>

        <v-expansion-panels class="links-expand">
          <v-expansion-panel>
            <template v-slot:title>
              <v-list-item prepend-icon="mdi-link-box-variant-outline"
                           append-icon="mdi-chevron-down"
                           title="Links"
                           value="links"
                           class="links"
                           :active="false"/>
            </template>

            <template v-slot:text>
              <v-list-item prepend-icon="mdi-send"
                           title="Telegram"
                           value="telegram"
                           :active="false"
                           @click="toTelegram"/>

              <v-list-item prepend-icon="mdi-bird"
                           title="Twitter"
                           value="twitter"
                           :active="false"
                           @click="toTwitter"/>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-list-item prepend-icon="mdi-email-newsletter"
                     title="Contact us"
                     value="contact"
                     :active="false"
                     @click="openContact"></v-list-item>

        <v-list-item v-if="authStore.isAuthorized"
                     prepend-icon="mdi-logout"
                     title="Logout"
                     value="logout"
                     @click="logout"
                     :active="false"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <div v-if="isLessThan930 && sidebarStore.isDrawer"
           class="dark-overlay" @click="sidebarStore.close()"/>
      <router-view/>
    </v-main>
  </v-layout>
</template>

<script>
import {useSidebarStore} from "@/stores/sidebar.js";
import {useAuthStore} from "@/stores/auth.js";
import router from "@/router/index.js";
import {UtRouter} from "@/util/UtRouter.js";
import ContactDialog from "@/dialog/ContactDialog.vue";
import {useContactDialogStore, useDialogStore} from "@/stores/dialog.js";
import ProgressCircular from "@/components/ProgressCircular.vue";

export default {
  components: {ProgressCircular, ContactDialog},
  data () {
    return {
      sidebarStore: useSidebarStore(),
      authStore: useAuthStore(),
      contactDialog: useContactDialogStore(),
      loginDialog: useDialogStore().getLoginDialog
    }
  },
  computed: {
      isLessThan930() {
        return UtRouter.isLessThan930()
      }
  },
  methods: {
    isActive(path) {
      return UtRouter.isActive(path)
    },
    toAndCloseSidebar(path) {
      router.push(path)
      if(this.isLessThan930) {
        this.sidebarStore.close()
      }
    },
    toOrLogin(path) {
      if(this.authStore.isAuthorized || UtRouter.isDefaultPath(path)) {
        router.push(path)
        if(this.isLessThan930) {
          this.sidebarStore.close()
        }
      } else {
        this.loginDialog.openLoginOrVerify()
      }
    },
    toTelegram() {
      const url = import.meta.env.VITE_TELEGRAM_URL
      window.open(url, '_blank')
    },
    toTwitter() {
      const url = import.meta.env.VITE_TWITTER_URL
      window.open(url, '_blank')
    },
    toAdminka() {
      router.push('/adminka')
      if(this.isLessThan930) {
        this.sidebarStore.close()
      }
    },
    async logout() {
      await this.authStore.logout()
      this.emitter.emit('logout')
      const currentPath = router.currentRoute.value.fullPath
      if(!UtRouter.isDefaultPath(currentPath)) {
        await router.push('/explore')
      }
      if(this.isLessThan930) {
        this.sidebarStore.close()
      }
    },
    openContact() {
      if(this.authStore.isAuthorized) {
        this.contactDialog.show()
      } else {
        this.loginDialog.openLoginOrVerify()
      }
    }
  }
}
</script>

<style lang="scss">
.v-overlay.check-user-info-loading {
  .v-overlay__content {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}
  #app-sidebar {
    min-height: 100svh;

    .v-navigation-drawer {
      border-right: 1px solid rgba(255, 255, 255, 0.5);
      background-color: $main-black;
      padding-top: $toolbar-height;

      &__content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: white;

        .links-expand {
          margin: 4px 0 10px 0;

          .v-list-item {
            width: 100%;
          }

          .v-expansion-panel-title__icon {
            display: none;
          }

          .v-expansion-panel-title {
            height: 40px;
            min-height: unset;
            padding: 0;
          }

          .v-expansion-panel-text__wrapper {
            padding: unset;
          }
        }

        .v-list:nth-child(1), .v-list:nth-child(2) {
          overflow-y: auto;
        }

        .v-list:nth-child(2) {
          //padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.5);
        }
        .v-list {
          .v-list-item.premium {
            color: #ec61a1;
          }
          .v-list-item {
            //border: 1px white solid;

            &__prepend {
              .mdi {
                opacity: unset;
                font-size: 30px;
              }
            }

            &__spacer {
              width: 15px;
            }

            &__content {
              font-size: 30px;
            }
          }

          .v-list-item.links {
            pointer-events: none;
            margin-bottom: unset;
          }
        }
      }
    }

    .v-navigation-drawer--rail {
      .v-list-item--link {
        width: 100% !important;
        display: flex;
        justify-content: center;

        .v-list-item__append {
          display: none;
        }
      }
      .v-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        .v-list-item.premium {
          color: #ec61a1;
        }
        .v-list-item {
          width: fit-content;

          &__prepend {
            .mdi {
              //font-size: 30px;
            }
          }
          &__spacer, &__content {
            display: none;
          }
        }
      }
    }

    .v-main {
      //height: 100%;
      //min-height: 100svh;
      margin: 0 auto;
      //padding-left: unset;
      width: 100%;
      max-width: $layout-max-width;
      padding-top: $toolbar-height;

      .dark-overlay {
        z-index: 200;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: $main-overlay;
      }
    }
  }
  
  @media(max-width: 930px) {
    #app-sidebar {
      .v-navigation-drawer--active {

      }
      .v-main {
        padding-left: unset;
      }
    }
  }
</style>