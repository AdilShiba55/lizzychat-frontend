<template>
  <RouterView/>
</template>

<script>
import ErrorDialog from "@/dialog/ErrorDialog.vue";
import {useAuthStore} from "@/stores/auth.js";
import {useSidebarStore} from "@/stores/sidebar.js";

export default {
  components: {ErrorDialog},
  data() {
    return {
      authStore: useAuthStore(),
      sidebarStore: useSidebarStore()
    }
  },
  mounted() {
    this.authStore.checkLogin()
    this.sidebarStore.checkExpanded()
    const app = document.getElementById('app')
  }
}

</script>