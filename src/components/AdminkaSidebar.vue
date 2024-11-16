<template>
  <v-layout id="adminka-sidebar">
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

        <v-list-item prepend-icon="mdi-notebook-outline"
                     title="User"
                     value="user"
                     :active="isActive('/adminka/user')"
                     @click="goTo('/adminka/user')"></v-list-item>

        <v-list-item prepend-icon="mdi-notebook-outline"
                     title="Character"
                     value="character"
                     :active="isActive('/adminka/character')"
                     @click="goTo('/adminka/character')"></v-list-item>

        <v-list-item prepend-icon="mdi-notebook-outline"
                     title="Request"
                     value="request"
                     :active="isActive('/adminka/request')"
                     @click="goTo('/adminka/request')"></v-list-item>

        <v-list-item prepend-icon="mdi-image-outline"
                     title="Playground"
                     value="imagePlayground"
                     :active="isActive('/adminka/playground-image')"
                     @click="goTo('/adminka/playground-image')"></v-list-item>

        <v-list-item prepend-icon="mdi-head-question-outline"
                     title="FAQ"
                     value="faq"
                     :active="isActive('/adminka/faq')"
                     @click="goTo('/adminka/faq')"></v-list-item>
      </v-list>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home-account"
                     title="Main"
                     value="main"
                     :active="false"
                     @click="toMain"/>

        <v-list-item prepend-icon="mdi-logout"
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

export default {
  components: {ContactDialog},
  data () {
    return {
      sidebarStore: useSidebarStore(),
      authStore: useAuthStore()
    }
  },
  computed: {
    isLessThan930() {
      return UtRouter.isLessThan930()
    }
  },
  methods: {
    goTo(path) {
      router.push(path)
      if(this.isLessThan930) {
        this.sidebarStore.close()
      }
    },
    isActive(path) {
      return UtRouter.isActive(path)
    },
    toTelegram() {
      const url = import.meta.env.VITE_TELEGRAM_URL
      window.open(url, '_blank')
    },
    toMain() {
      router.push('/')
      if(this.isLessThan930) {
        this.sidebarStore.close()
      }
    },
    logout() {
      this.authStore.logout()
      router.push('/explore')
    }
  }
}
</script>

<style lang="scss">
#adminka-sidebar {
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

      .v-list:nth-child(1) {
        overflow-y: auto;
      }

      .v-list:nth-child(2) {
        border-top: 1px solid rgba(255, 255, 255, 0.5);
      }
      .v-list {
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
      }
    }
  }

  .v-navigation-drawer--rail {
    .v-list {
      display: flex;
      flex-direction: column;
      align-items: center;
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
    min-height: calc(100svh - $toolbar-height);
    margin: 0 auto;
    //padding-left: unset;
    //max-width: $layout-max-width;
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
  #adminka-sidebar {
    .v-navigation-drawer--active {

    }
    .v-main {
      padding-left: unset;
    }
  }
}
</style>